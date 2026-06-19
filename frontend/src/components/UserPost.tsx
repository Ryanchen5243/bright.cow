import pfp from '../assets/default_profile_photo.jpg';
import { Favorite, FavoriteBorder, MessageOutlined, SendOutlined } from '@mui/icons-material';
import { useState } from 'react';

export default function UserPost(props: {
    postId: string;
    postTitle?: string;
    postAuthor?: string;
    postContent?: string;
    postCreationTimeStamp: string;
    postAttachments?: { type: string, url: string }[];
    postComments?: { id: string, author: string, content: string }[];
    postInitialLikeCount?: number;
    postInitialCommentCount?: number;
    postInitialShareCount?: number;
    }) {

    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(props.postInitialLikeCount || 0);
    const [showComments, setShowComments] = useState(false);
    const [shareCount, setShareCount] = useState(props.postInitialShareCount || 0);
    const [commentInput, setCommentInput] = useState('');
    const [commentItems, setCommentItems] = useState<{ id: string, author: string, content: string }[]>(props.postComments?.map(({ id, author, content, }) => ({id,author,content,})) ?? []);
    const commentCount = commentItems.length;

    const toggleLike = () => {
        setIsLiked((prev) => {
            const next = !prev;
            setLikeCount((count) => count + (next ? 1 : -1));
            // insert logic for persisting like state change here
            return next;
        });
    };

    const addComment = () => {
        const nextComment = commentInput.trim();
        if (!nextComment) {
            return;
        }
        setCommentItems((prev) => [{ id: Date.now().toString(), author: 'Current User', content: nextComment }, ...prev]);
        setCommentInput('');
        // insert logic for persisting new comment here
    };

    const sharePost = async () => {
        try {
            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(`${props.postAuthor ?? 'Unknown'}: ${props.postContent ?? ''}`);
            }
            setShareCount((count) => count + 1);
            // insert additional logic for persisting share action here
        } catch {
            // clipboard write failed; do not increment share count
        }
    };

    return (
        <article className="user-post">
            <div className="user-post-avatar">
                <img src={pfp} alt={`${props.postAuthor} avatar`} />
            </div>
            <div className="user-post-content">
                <div className="user-post-header">
                    <div className="user-post-identity">
                        <h3>{props.postAuthor}</h3>
                        <p>@{props.postAuthor}</p>
                    </div>
                    <span className="user-post-timestamp">{props.postCreationTimeStamp}</span>
                </div>
                {props.postTitle && <p className="user-post-title">{props.postTitle}</p>}
                {props.postContent && <p className="user-post-body">{props.postContent}</p>}
                {props.postAttachments && props.postAttachments.length > 0 && (
                    <div className="user-post-media-grid" aria-label="Post media attachments">
                        {props.postAttachments.map((attachment, index) => (
                            <img key={`${attachment.url}-${index}`} src={attachment.url} alt={`Post attachment ${index + 1}`} className="user-post-media-image" />
                        ))}
                    </div>
                )}
                <div className="user-post-metrics">
                    <span>{likeCount} Likes</span>
                    <span>{commentCount} Comments</span>
                    <span>{shareCount} Shares</span>
                </div>
                <div className="user-post-actions" role="group" aria-label="Post actions">
                    <button className={`user-post-action-button ${isLiked ? 'liked' : ''}`} onClick={toggleLike}>
                        <div className="like-button">
                            {isLiked ? <Favorite fontSize="small" /> : <FavoriteBorder fontSize="small" />}
                            <span>Like</span>
                        </div>
                    </button>
                    <button className="user-post-action-button" onClick={() => setShowComments((prev) => !prev)}>
                        <div className="comment-button">
                            <MessageOutlined fontSize="small" />
                            <span>Comment</span>
                        </div>
                    </button>
                    <button className="user-post-action-button" onClick={sharePost}>
                        <div className="share-button">
                            <SendOutlined fontSize="small" />
                            <span>Share</span>
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
                                {commentItems.map((comment, index) => (
                                    <p key={`${comment.id}-${index}`}><strong>{comment.author}:</strong> {comment.content}</p>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </article>
    );
}