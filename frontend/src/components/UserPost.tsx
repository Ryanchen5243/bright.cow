import pfp from '../assets/default_profile_photo.jpg';
import { Favorite, FavoriteBorder, MessageOutlined, SendOutlined } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/authContext';

export default function UserPost(props: {post: any, userName: string, displayName: string}) {
    const [post, _] = useState(props.post);
    const { currentUser } = useAuth();
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(post.likesCount || 0);
    const [showComments, setShowComments] = useState(false);
    const [shareCount, setShareCount] = useState(post.sharesCount || 0);
    const [commentInput, setCommentInput] = useState('');
    const [commentItems, setCommentItems] = useState(post.comments || []);
    const commentCount = commentItems.length;

    const toggleLike = () => {
        setIsLiked((prev) => {
            const next = !prev;
            setLikeCount((count: number) => Math.max(0, count + (next ? 1 : -1)));
            // insert logic for persisting like state change here
            return next;
        });
    };

    const addComment = () => {
        const nextComment = commentInput.trim();
        if (!nextComment) {
            return;
        }
        setCommentItems((prev : any) => [{ id: crypto.randomUUID(), author_id: currentUser?.displayName, content: nextComment }, ...prev]);
        setCommentInput('');
        // insert logic for persisting new comment here
    };

    const sharePost = async () => {
        try {
            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(`${post.postAuthorDisplayName ?? 'Unknown'}: ${post.postContent ?? ''}`);
            }
            setShareCount((count: number) => count + 1);
            // insert additional logic for persisting share action here
        } catch {
            // clipboard write failed; do not increment share count
        }
    };

    // useEffect(() => {
    //     console.log(currentUser);
    //     // insert logic for fetching and setting initial like state here
    // }, [currentUser]);
    return (
        <article className="user-post">
            <div className="user-post-avatar">
                <img src={pfp} alt={`${props?.userName} avatar`} />
            </div>
            <div className="user-post-content">
                <div className="user-post-header">
                    <div className="user-post-identity">
                        <h3>{props?.displayName}</h3>
                        <p>{props?.userName}</p>
                    </div>
                    <span className="user-post-timestamp">{post?.timestamp}</span>
                </div>
                {/* {post.title && <p className="user-post-title">{post.title}</p>} */}
                {post.content && <p className="user-post-body">{post.content}</p>}
                {post.attachments && post.attachments.length > 0 && (
                    <div className="user-post-media-grid" aria-label="Post media attachments">
                        {post.attachments.map((attachment: { "type": string, "url": string }, index: number) => (
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
                                {commentItems.map((comment : {id: string, author_id: string, content: string}, index) => (
                                    <p key={`${comment.id}-${index}`}><strong>{comment.author_id}:</strong> {comment.content}</p>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </article>
    );
}