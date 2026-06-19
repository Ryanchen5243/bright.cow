import { useMemo, useState, useEffect, type ChangeEvent } from 'react';
import { Button, Dialog, DialogActions, DialogContent,DialogTitle,Stack,TextField,Typography } from '@mui/material';
import UserPost from './UserPost';
import { useAuth } from '../contexts/authContext';
import { type FeedPost } from '../mocks/postTemplate.ts';
import { v4 as uuid } from 'uuid';
import { currUser } from '../mocks/currUser';

function formatUsername(rawValue?: string | null): string {
    if (!rawValue) {
        return '@guest';
    }
    return `@${rawValue.replace(/[^a-zA-Z0-9_]/g, '').toLowerCase() || 'guest'}`;
}

export default function Posts() {
    const { currentUser } = useAuth();
    const [allPosts, setAllPosts] = useState<FeedPost[] | null>(null);
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const [draftBody, setDraftBody] = useState('');
    const [draftMediaUrls, setDraftMediaUrls] = useState<string[]>([]);

    const resolvedDisplayName = useMemo(() => {
        if (currentUser?.displayName) {
            return currentUser.displayName;
        }
        if (currentUser?.email) {
            return currentUser.email.split('@')[0];
        }
        return 'Guest Creator';
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
        setDraftBody('');
    };

    const closeCreateDialog = () => {
        setIsCreateDialogOpen(false);
        resetComposer();
    };

    const handleMediaUpload = (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (!files || files.length === 0) {
            return;
        }
        const urls = Array.from(files).map((file) => URL.createObjectURL(file));
        setDraftMediaUrls((prev) => [...prev, ...urls]);
        event.target.value = '';
    };

    const removeDraftMedia = (indexToRemove: number) => {
        setDraftMediaUrls((prev) => {
            const next = prev.filter((_, index) => index !== indexToRemove);
            const removedUrl = prev[indexToRemove];
            if (removedUrl) {
                URL.revokeObjectURL(removedUrl);
            }
            return next;
        });
    };

    const createPost = () => {
        const trimmedBody = draftBody.trim();
        if (!trimmedBody && draftMediaUrls.length === 0) {
            return;
        }

        const nextPost: FeedPost = {
            id: uuid(),
            title: '',
            author: resolvedDisplayName,
            content: trimmedBody,
            timestamp: new Date().toISOString(),
            attachments: draftMediaUrls.map((url) => ({ type: 'image', url })),
            comments: [],
            likesCount: 0,
            sharesCount: 0,
            commentsCount: 0,
        };

        setAllPosts((prev) => [nextPost, ...(prev || [])]);
        setIsCreateDialogOpen(false);
        setDraftMediaUrls([]);
        setDraftBody('');
    };

    useEffect(() => {
        // Simulate fetching posts from an API
        const fetchPosts = async () => {
            const response = await fetch(new URL('../mocks/seedProfiles.json', import.meta.url).href);
            const data = await response.json();
            const creator = Array.isArray(data) ? data.find((creator: { id: string }) => creator.id === currUser.id) : null;
            const posts = creator?.recentPosts ?? [];
            setAllPosts(posts);
        }
        fetchPosts();
    }, []);

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
                        <div>
                            <button className="posts-header-button" onClick={() => setIsCreateDialogOpen(true)}>
                                Create Post
                            </button>
                        </div>
                    </header>

                    <div className="posts">
                        {allPosts && allPosts.length > 0 ? (
                            allPosts.map((post) => (
                                <UserPost
                                    postId={post.id}
                                    postTitle={post.title}
                                    postAuthor={post.author}
                                    postContent={post.content}
                                    postCreationTimeStamp={post.timestamp}
                                    postAttachments={post.attachments}
                                    postComments={post.comments}
                                    postInitialLikeCount={post.likesCount}
                                    postInitialCommentCount={post.commentsCount}
                                    postInitialShareCount={post.sharesCount}
                                />
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
                <DialogActions>
                    <Button onClick={closeCreateDialog}>Cancel</Button>
                    <Button variant="contained" onClick={createPost} disabled={!draftBody.trim() && draftMediaUrls.length === 0}>
                        Post
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}