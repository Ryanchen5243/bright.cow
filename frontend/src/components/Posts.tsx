import { useMemo, useState, useEffect, type ChangeEvent } from 'react';
import { Button, Dialog, DialogActions, DialogContent,DialogTitle,Stack,TextField,Typography } from '@mui/material';
import UserPost from './UserPost';
import { useAuth } from '../contexts/authContext';
import authAxios from '../axios/authAxios';
import { v4 as uuidv4 } from 'uuid';

function formatUsername(rawValue?: string | null): string {
    if (!rawValue) {
        return '@guest';
    }
    return `@${rawValue.replace(/[^a-zA-Z0-9_]/g, '').toLowerCase() || 'guest'}`;
}

export default function Posts(props: {creatorUUID: string | null, userName: string, displayName: string, isOwnProfile?: boolean}) {
    const { currentUser } = useAuth();
    const [allPosts, setAllPosts] = useState<Array<any> | null>(null);
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const [draftBody, setDraftBody] = useState('');
    const [draftMediaUrls, setDraftMediaUrls] = useState<string[]>([]);
    const [draftMediaFiles, setDraftMediaFiles] = useState<File[]>([]);

    const [isPosting, setIsPosting] = useState(false);
    const [uploadError, setUploadError] = useState<string | null>(null);

    const MAX_FILES = 4;
    const MAX_FILE_BYTES = 10 * 1024 * 1024; // 10 MB

    const resolvedDisplayName = useMemo(() => {
        if (currentUser?.displayName) {
            return currentUser.displayName;
        }
        if (currentUser?.email) {
            return currentUser.email.split('@')[0];
        }
        return 'Guest User';
    }, [currentUser?.displayName, currentUser?.email]);

    const resolvedUsername = useMemo(() => {
        if (currentUser?.email) {
            return formatUsername(currentUser.email.split('@')[0]);
        }
        return formatUsername(currentUser?.uid?.slice(0, 8));
    }, [currentUser?.email, currentUser?.uid]);

    const resetComposer = () => {
        draftMediaUrls.forEach((url) => URL.revokeObjectURL(url));
        setDraftMediaUrls([]);
        setDraftMediaFiles([]);
        setDraftBody('');
        setUploadError(null);
    };

    const closeCreateDialog = () => {
        setIsCreateDialogOpen(false);
        resetComposer();
    };

    const handleMediaUpload = (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (!files || files.length === 0) return;
        const newFiles = Array.from(files);
        const oversized = newFiles.filter((f) => f.size > MAX_FILE_BYTES);
        if (oversized.length > 0) {
            setUploadError(`Each image must be under 10 MB. ${oversized.map((f) => f.name).join(', ')} exceeded the limit.`);
            event.target.value = '';
            return;
        }
        if (draftMediaFiles.length + newFiles.length > MAX_FILES) {
            setUploadError(`You can attach at most ${MAX_FILES} images per post.`);
            event.target.value = '';
            return;
        }
        setUploadError(null);
        const urls = newFiles.map((file) => URL.createObjectURL(file));
        setDraftMediaUrls((prev) => [...prev, ...urls]);
        setDraftMediaFiles((prev) => [...prev, ...newFiles]);
        event.target.value = '';
    };

    const removeDraftMedia = (indexToRemove: number) => {
        setDraftMediaUrls((prev) => {
            const removedUrl = prev[indexToRemove];
            if (removedUrl) URL.revokeObjectURL(removedUrl);
            return prev.filter((_, index) => index !== indexToRemove);
        });
        setDraftMediaFiles((prev) => prev.filter((_, index) => index !== indexToRemove));
    };

    const createPost = async () => {
        const trimmedBody = draftBody.trim();
        if (!trimmedBody && draftMediaFiles.length === 0) return;

        setIsPosting(true);
        let newPost: any;
        try {
            const { data } = await authAxios.post(
                '/posts',
                { content: trimmedBody },
                { headers: { 'Idempotency-Key': uuidv4() } },
            );
            newPost = data;
        } catch {
            setIsPosting(false);
            return;
        }

        // Upload each image: presign → PUT to S3 → save metadata
        let failedUploads = 0;
        for (let i = 0; i < draftMediaFiles.length; i++) {
            const file = draftMediaFiles[i];
            try {
                const { data: presign } = await authAxios.post(`/posts/${newPost.id}/presign-upload`, {
                    contentType: file.type,
                    filename: file.name,
                    position: i,
                });
                await fetch(presign.uploadUrl, {
                    method: 'PUT',
                    headers: { 'Content-Type': file.type },
                    body: file,
                });
                const { data: savedImage } = await authAxios.post(`/posts/${newPost.id}/images`, {
                    s3Key: presign.s3Key,
                    contentType: file.type,
                    fileSizeBytes: file.size,
                    position: i,
                });
                newPost.images = [...(newPost.images ?? []), savedImage];
            } catch {
                failedUploads++;
            }
        }

        setAllPosts((prev) => [newPost, ...(prev ?? [])]);
        setIsPosting(false);
        setIsCreateDialogOpen(false);
        resetComposer();
        if (failedUploads > 0) {
            setUploadError(`Post created, but ${failedUploads} image${failedUploads > 1 ? 's' : ''} failed to upload.`);
        }
    };

    useEffect(() => {
        if (!props.creatorUUID) {
            setAllPosts([]);
            return;
        }
        authAxios.get(`/posts/${props.creatorUUID}`)
            .then(({ data }) => setAllPosts(data))
            .catch(() => setAllPosts([]));
    }, [props.creatorUUID]);

    return (
        <>
            <section className="posts-page">
                <aside className="posts-side-column posts-side-column-left" aria-hidden="true">
                <div className="posts-side-card">
                    <p className="posts-side-card-label">Suggested</p>
                    <h3>Creators to Watch</h3>
                    <span>CoachAstra</span>
                    <span>RankLiftGG</span>
                    <span>VODLab</span>
                </div>
                <div className="posts-side-card">
                    <p className="posts-side-card-label">Today</p>
                    <h3>Trending Topics</h3>
                    <span>Ranked mindset</span>
                    <span>Aim warmups</span>
                    <span>Clutch review</span>
                </div>
                </aside>

                <div className="posts-main-column">
                    <header className="posts-main-header">
                        <div>
                            <h2>Posts</h2>
                            <p>Latest updates from creators and coaching circles.</p>
                        </div>
                        {props.isOwnProfile && (
                            <div>
                                <button className="posts-header-button" onClick={() => setIsCreateDialogOpen(true)}>
                                    Create Post
                                </button>
                            </div>
                        )}
                    </header>

                    <div className="posts">
                        {allPosts && allPosts.length > 0 ? (
                            allPosts.map((post) => (
                                <UserPost key={post.id} post={post} userName={props.userName} displayName={props.displayName} isOwnPost={props.isOwnProfile} onDelete={(id) => setAllPosts((prev) => prev?.filter((p) => p.id !== id) ?? null)} />
                            ))
                        ) : (
                            <p>No posts available.</p>
                        )}
                    </div>
                </div>

                <aside className="posts-side-column posts-side-column-right" aria-hidden="true">
                <div className="posts-side-card">
                    <p className="posts-side-card-label">Queue</p>
                    <h3>Upcoming Sessions</h3>
                    <span>Tonight, 9:00 PM</span>
                    <span>Sat, 2:30 PM</span>
                </div>
                <div className="posts-side-card">
                    <p className="posts-side-card-label">Note</p>
                    <h3>Stay Consistent</h3>
                    <span>Small improvements stack over time.</span>
                </div>
                </aside>
            </section>

            <Dialog open={isCreateDialogOpen} onClose={closeCreateDialog} fullWidth maxWidth="sm">
                <DialogTitle>Create Post</DialogTitle>
                <DialogContent>
                    <Stack spacing={2} sx={{ pt: 1 }}>
                        <Stack spacing={0.5}>
                            <Typography variant="subtitle1" fontWeight={700} color="text.primary">
                                {resolvedDisplayName}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {resolvedUsername}
                            </Typography>
                        </Stack>

                        <TextField
                            multiline
                            minRows={4}
                            placeholder="What do you want to share?"
                            value={draftBody}
                            onChange={(event) => setDraftBody(event.target.value)}
                            fullWidth
                        />

                        <Stack spacing={1}>
                            <Button variant="outlined" component="label">
                                Upload Image / GIF / Meme
                                <input type="file" accept="image/*,.gif" multiple hidden onChange={handleMediaUpload} />
                            </Button>
                            {draftMediaUrls.length > 0 && (
                                <div className="post-composer-media-grid">
                                    {draftMediaUrls.map((url, index) => (
                                        <div className="post-composer-media-item" key={url}>
                                            <img src={url} alt={`Post upload ${index + 1}`} />
                                            <button
                                                type="button"
                                                className="post-composer-media-remove"
                                                onClick={() => removeDraftMedia(index)}
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </Stack>
                    </Stack>
                </DialogContent>
                <DialogActions sx={{ flexDirection: 'column', alignItems: 'stretch', gap: 1, px: 3, pb: 2 }}>
                    {uploadError && <Typography variant="body2" color="error">{uploadError}</Typography>}
                    <Stack direction="row" justifyContent="flex-end" spacing={1}>
                        <Button onClick={closeCreateDialog}>Cancel</Button>
                        <Button variant="contained" onClick={createPost} disabled={(!draftBody.trim() && draftMediaUrls.length === 0) || isPosting}>
                            {isPosting ? 'Posting…' : 'Post'}
                        </Button>
                    </Stack>
                </DialogActions>
            </Dialog>
        </>
    )
}