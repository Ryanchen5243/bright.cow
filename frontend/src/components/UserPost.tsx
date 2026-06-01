import pfp from '../assets/default_profile_photo.jpg';
import { Favorite, FavoriteBorder, MessageOutlined, SendOutlined } from '@mui/icons-material';
import { useMemo, useState } from 'react';

type UserPostProps = {
    title?: string;
    body?: string;
    timestamp?: string;
    likes?: number;
    comments?: number;
    displayName?: string;
    username?: string;
    mediaUrls?: string[];
};

export default function UserPost({
    title,
    body = 'content for the post',
    timestamp,
    likes = 234,
    comments = 12,
    displayName = 'Luna Wang',
    username = '@lunawang',
    mediaUrls = []
}: UserPostProps) {
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(likes);
    const [showComments, setShowComments] = useState(false);
    const [commentCount, setCommentCount] = useState(comments);
    const [shareCount, setShareCount] = useState(0);
    const [commentInput, setCommentInput] = useState('');
    const [commentItems, setCommentItems] = useState<string[]>([]);

    const formattedTimestamp = useMemo(() => {
        if (timestamp) {
            return timestamp;
        }
        return new Date().toLocaleString();
    }, [timestamp]);

    const toggleLike = () => {
        setIsLiked((prev) => {
            const next = !prev;
            setLikeCount((count) => count + (next ? 1 : -1));
            return next;
        });
    };

    const addComment = () => {
        const nextComment = commentInput.trim();
        if (!nextComment) {
            return;
        }
        setCommentItems((prev) => [nextComment, ...prev]);
        setCommentInput('');
        setCommentCount((count) => count + 1);
    };

    const sharePost = async () => {
        try {
            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(`${displayName} (${username}): ${body}`);
            }
        } finally {
            setShareCount((count) => count + 1);
        }
    };

    return (
        <article className="user-post">
            <div className="user-post-avatar">
                <img src={pfp} alt="Luna avatar" />
            </div>
            <div className="user-post-content">
                <div className="user-post-header">
                    <div className="user-post-identity">
                        <h3>{displayName}</h3>
                        <p>{username}</p>
                    </div>
                    <span className="user-post-timestamp">{formattedTimestamp}</span>
                </div>
                {title && <p className="user-post-title">{title}</p>}
                <p className="user-post-body">{body}</p>
                {mediaUrls.length > 0 && (
                    <div className="user-post-media-grid" aria-label="Post media attachments">
                        {mediaUrls.map((url, index) => (
                            <img key={`${url}-${index}`} src={url} alt={`Post attachment ${index + 1}`} className="user-post-media-image" />
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
                                    <p key={`${comment}-${index}`}>{comment}</p>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </article>
    );
}