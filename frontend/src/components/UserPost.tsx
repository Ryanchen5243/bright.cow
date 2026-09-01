import pfp from '../assets/default_profile_photo.jpg';
import { Favorite, FavoriteBorder, MessageOutlined, MoreVert } from '@mui/icons-material';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Menu, MenuItem, Stack, TextField, Typography } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import authAxios from '../axios/authAxios';
import { v4 as uuidv4 } from 'uuid';

export default function UserPost(props: {post: any, userName: string, displayName: string, onInteract?: () => void, isOwnPost?: boolean, onDelete?: (postId: string) => void}) {
    const [post, _] = useState(props.post);
    const [isLiked, setIsLiked] = useState<boolean>(post.liked_by_me ?? false);
    const [isLiking, setIsLiking] = useState(false);
    const [likeCount, setLikeCount] = useState<number>(post.like_count ?? post.likesCount ?? 0);
    const [showComments, setShowComments] = useState(false);
    const [commentsLoaded, setCommentsLoaded] = useState(false);
    const [commentInput, setCommentInput] = useState('');
    const [commentItems, setCommentItems] = useState<any[]>(post.comments || []);
    const [postContent, setPostContent] = useState<string>(post.content ?? '');
    const [postImages, setPostImages] = useState<any[]>(post.images ?? []);
    const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [editDraft, setEditDraft] = useState('');
    const [editKeptImages, setEditKeptImages] = useState<any[]>([]);
    const [editNewFiles, setEditNewFiles] = useState<File[]>([]);
    const [editNewUrls, setEditNewUrls] = useState<string[]>([]);
    const [editUploadError, setEditUploadError] = useState<string | null>(null);
    const [isSaving, setIsSaving] = useState(false);
    const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
    const MAX_FILES = 4;
    const MAX_FILE_BYTES = 10 * 1024 * 1024;
    const menuButtonRef = useRef<HTMLButtonElement>(null);
    const { onInteract } = props;
    const commentCount = commentsLoaded ? commentItems.length : (post.comment_count ?? commentItems.length);

    const timestamp = post.created_at
        ? new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(post.created_at))
        : post.timestamp;

    const toggleLike = async () => {
        if (isLiking) return;
        const nextLiked = !isLiked;
        setIsLiked(nextLiked);
        setLikeCount((count) => Math.max(0, count + (nextLiked ? 1 : -1)));
        setIsLiking(true);
        try {
            if (nextLiked) {
                await authAxios.post(`/posts/${post.id}/like`);
            } else {
                await authAxios.delete(`/posts/${post.id}/like`);
            }
        } catch {
            setIsLiked(!nextLiked);
            setLikeCount((count) => Math.max(0, count + (nextLiked ? -1 : 1)));
        } finally {
            setIsLiking(false);
        }
    };

    const addComment = async () => {
        const nextComment = commentInput.trim();
        if (!nextComment) return;
        setCommentInput('');
        try {
            const { data } = await authAxios.post(`/posts/${post.id}/comments`, { content: nextComment }, { headers: { 'Idempotency-Key': uuidv4() } });
            setCommentItems((prev) => [...prev, data]);
        } catch {
            setCommentInput(nextComment);
        }
    };

    const openEdit = () => {
        setEditDraft(postContent);
        setEditKeptImages(postImages);
        setEditNewFiles([]);
        setEditNewUrls([]);
        setEditUploadError(null);
        setMenuAnchor(null);
        setIsEditOpen(true);
    };

    const handleEditMediaUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;
        const newFiles = Array.from(files);
        const oversized = newFiles.filter((f) => f.size > MAX_FILE_BYTES);
        if (oversized.length > 0) {
            setEditUploadError(`Each image must be under 10 MB. ${oversized.map((f) => f.name).join(', ')} exceeded the limit.`);
            e.target.value = '';
            return;
        }
        if (editKeptImages.length + editNewFiles.length + newFiles.length > MAX_FILES) {
            setEditUploadError(`You can attach at most ${MAX_FILES} images per post.`);
            e.target.value = '';
            return;
        }
        setEditUploadError(null);
        setEditNewFiles((prev) => [...prev, ...newFiles]);
        setEditNewUrls((prev) => [...prev, ...newFiles.map((f) => URL.createObjectURL(f))]);
        e.target.value = '';
    };

    const removeEditNewFile = (index: number) => {
        setEditNewUrls((prev) => { URL.revokeObjectURL(prev[index]); return prev.filter((_, i) => i !== index); });
        setEditNewFiles((prev) => prev.filter((_, i) => i !== index));
    };

    const saveEdit = async () => {
        const trimmed = editDraft.trim();
        if (!trimmed && editKeptImages.length === 0 && editNewFiles.length === 0) return;
        setIsSaving(true);
        try {
            await authAxios.patch(`/posts/${post.id}`, { content: trimmed });
            setPostContent(trimmed);

            // delete removed images
            const removedImages = postImages.filter((img) => !editKeptImages.some((k) => k.id === img.id));
            await Promise.allSettled(removedImages.map((img) => authAxios.delete(`/posts/${post.id}/images/${img.id}`)));

            // upload new images
            let failedUploads = 0;
            const uploadedImages: any[] = [];
            for (let i = 0; i < editNewFiles.length; i++) {
                const file = editNewFiles[i];
                try {
                    const { data: presign } = await authAxios.post(`/posts/${post.id}/presign-upload`, { contentType: file.type, position: editKeptImages.length + i });
                    await fetch(presign.uploadUrl, { method: 'PUT', headers: { 'Content-Type': file.type }, body: file });
                    const { data: savedImage } = await authAxios.post(`/posts/${post.id}/images`, { s3Key: presign.s3Key, contentType: file.type, fileSizeBytes: file.size, position: editKeptImages.length + i });
                    uploadedImages.push({ ...savedImage, url: URL.createObjectURL(file) });
                } catch {
                    failedUploads++;
                }
            }

            setPostImages([...editKeptImages, ...uploadedImages]);
            setEditNewUrls((prev) => { prev.forEach(URL.revokeObjectURL); return []; });
            setIsEditOpen(false);
            if (failedUploads > 0) setEditUploadError(`Post saved, but ${failedUploads} image${failedUploads > 1 ? 's' : ''} failed to upload.`);
        } catch {
            // keep dialog open on failure
        } finally {
            setIsSaving(false);
        }
    };

    const deletePost = async () => {
        setIsConfirmDeleteOpen(false);
        try {
            await authAxios.delete(`/posts/${post.id}`);
            props.onDelete?.(post.id);
        } catch {
            // silent — post stays visible
        }
    };

    useEffect(() => {
        if (!showComments || commentsLoaded || !post.id) return;
        authAxios.get(`/posts/${post.id}/comments`)
            .then(({ data }) => { setCommentItems(data); setCommentsLoaded(true); })
            .catch(() => setCommentsLoaded(true));
    }, [showComments, commentsLoaded, post.id]);

    return (
        <article className={`user-post${onInteract ? ' user-post-interactive' : ''}`} onClick={onInteract}>
            <div className="user-post-avatar">
                <img src={pfp} alt={`${props?.userName} avatar`} />
            </div>
            <div className="user-post-content">
                <div className="user-post-header">
                    <div className="user-post-identity">
                        <h3>{props?.displayName}</h3>
                        <p>{props?.userName}</p>
                    </div>
                    {props.isOwnPost && (
                        <button
                            ref={menuButtonRef}
                            type="button"
                            className="user-post-menu-button"
                            aria-label="Post options"
                            onClick={(e) => { e.stopPropagation(); setMenuAnchor(menuButtonRef.current); }}
                        >
                            <MoreVert fontSize="small" />
                        </button>
                    )}
                    <span className="user-post-timestamp">{timestamp}</span>
                </div>
                {/* {post.title && <p className="user-post-title">{post.title}</p>} */}
                {postContent && <p className="user-post-body">{postContent}</p>}
                {postImages.length > 0 && (
                    <div className="user-post-media-grid" aria-label="Post media attachments">
                        {postImages.map((item: any, index: number) => {
                            const src = item.url ?? null;
                            if (!src) return null;
                            return <img key={item.id ?? `${src}-${index}`} src={src} alt={`Post attachment ${index + 1}`} className="user-post-media-image" />;
                        })}
                    </div>
                )}
                <div className="user-post-metrics">
                    <span>{likeCount} Likes</span>
                    <span>{commentCount} Comments</span>
                </div>
                <div className="user-post-actions" role="group" aria-label="Post actions">
                    <button className={`user-post-action-button ${isLiked ? 'liked' : ''}`} onClick={(e) => { e.stopPropagation(); toggleLike(); }} disabled={isLiking}>
                        <div className="like-button">
                            {isLiked ? <Favorite fontSize="small" /> : <FavoriteBorder fontSize="small" />}
                            <span>Like</span>
                        </div>
                    </button>
                    <button className="user-post-action-button" onClick={(e) => { e.stopPropagation(); onInteract ? onInteract() : setShowComments((prev) => !prev); }}>
                        <div className="comment-button">
                            <MessageOutlined fontSize="small" />
                            <span>Comment</span>
                        </div>
                    </button>
                </div>
                {showComments && (
                    <div className="user-post-comments-shell">
                        <div className="user-post-comment-input-row">
                            <input
                                type="text"
                                placeholder="Write a comment..."
                                value={commentInput}
                                onChange={(e) => setCommentInput(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                        addComment();
                                    }
                                }}
                            />
                            <button type="button" onClick={addComment}>Post</button>
                        </div>
                        {commentItems.length > 0 && (
                            <div className="user-post-comments-list">
                                {commentItems.map((comment: any, index: number) => (
                                    <p key={`${comment.id}-${index}`}><strong>{comment.user_display_name ?? comment.author_id}:</strong> {comment.content}</p>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>

            <Menu anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={() => setMenuAnchor(null)} onClick={(e) => e.stopPropagation()}>
                <MenuItem onClick={openEdit}>Edit</MenuItem>
                <MenuItem onClick={() => { setMenuAnchor(null); setIsConfirmDeleteOpen(true); }} sx={{ color: 'error.main' }}>Delete</MenuItem>
            </Menu>

            <Dialog open={isConfirmDeleteOpen} onClose={() => setIsConfirmDeleteOpen(false)} onClick={(e) => e.stopPropagation()}>
                <DialogTitle>Delete post?</DialogTitle>
                <DialogContent>
                    <Typography>This action cannot be undone.</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setIsConfirmDeleteOpen(false)}>Cancel</Button>
                    <Button variant="contained" color="error" onClick={deletePost}>Delete</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={isEditOpen} onClose={() => setIsEditOpen(false)} fullWidth maxWidth="sm" onClick={(e) => e.stopPropagation()}>
                <DialogTitle>Edit Post</DialogTitle>
                <DialogContent>
                    <Stack spacing={2} sx={{ pt: 1 }}>
                        <TextField multiline minRows={4} fullWidth value={editDraft} onChange={(e) => setEditDraft(e.target.value)} />
                        {editKeptImages.length > 0 && (
                            <div className="post-composer-media-grid">
                                {editKeptImages.map((item: any, index: number) => (
                                    <div className="post-composer-media-item" key={item.id ?? index}>
                                        <img src={item.url} alt={`Attachment ${index + 1}`} />
                                        <button type="button" className="post-composer-media-remove" onClick={() => setEditKeptImages((prev) => prev.filter((_, i) => i !== index))}>Remove</button>
                                    </div>
                                ))}
                            </div>
                        )}
                        {editNewUrls.length > 0 && (
                            <div className="post-composer-media-grid">
                                {editNewUrls.map((url, index) => (
                                    <div className="post-composer-media-item" key={url}>
                                        <img src={url} alt={`New attachment ${index + 1}`} />
                                        <button type="button" className="post-composer-media-remove" onClick={() => removeEditNewFile(index)}>Remove</button>
                                    </div>
                                ))}
                            </div>
                        )}
                        <Button variant="outlined" component="label">
                            Add Image / GIF / Meme
                            <input type="file" accept="image/*,.gif" multiple hidden onChange={handleEditMediaUpload} />
                        </Button>
                        {editUploadError && <Typography variant="body2" color="error">{editUploadError}</Typography>}
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setIsEditOpen(false)}>Discard</Button>
                    <Button variant="contained" onClick={saveEdit} disabled={(!editDraft.trim() && editKeptImages.length === 0 && editNewFiles.length === 0) || isSaving}>
                        {isSaving ? 'Saving…' : 'Save'}
                    </Button>
                </DialogActions>
            </Dialog>
        </article>
    );
}