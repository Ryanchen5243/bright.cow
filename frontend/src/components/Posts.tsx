import { useMemo, useState, type ChangeEvent } from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Stack,
    TextField,
    Typography
} from '@mui/material';
import UserPost from './UserPost';
import { useAuth } from '../contexts/authContext';

type FeedPost = {
    id: string;
    title: string;
    body: string;
    timestamp: string;
    likes: number;
    comments: number;
    displayName: string;
    username: string;
    mediaUrls?: string[];
};

const seedPosts: FeedPost[] = [
    {
        id: 'seed-1',
        title: 'Shipping a cleaner booking flow this week',
        body: 'Tightening up my late-night Valorant sessions so it is easier to book ranked, VOD review, or a low-key duo queue without the back-and-forth.',
        timestamp: '2h ago',
        likes: 84,
        comments: 12,
        displayName: 'Luna Wang',
        username: '@lunawang'
    },
    {
        id: 'seed-2',
        title: 'Current focus: confidence + comms',
        body: 'Most players do not need more raw mechanics first. They need sharper comms, cleaner pacing, and someone to make the next game feel winnable again.',
        timestamp: 'Yesterday',
        likes: 61,
        comments: 8,
        displayName: 'Luna Wang',
        username: '@lunawang'
    },
    {
        id: 'seed-3',
        title: 'Open slots for weekend sessions',
        body: 'Added extra availability for Friday and Saturday. If you want structured help without the rigid coaching vibe, this is the best window to grab.',
        timestamp: '3d ago',
        likes: 49,
        comments: 5,
        displayName: 'Luna Wang',
        username: '@lunawang'
    }
];

function formatUsername(rawValue?: string | null): string {
    if (!rawValue) {
        return '@guest';
    }
    return `@${rawValue.replace(/[^a-zA-Z0-9_]/g, '').toLowerCase() || 'guest'}`;
}

export default function Posts() {
    const { currentUser } = useAuth();
    const [allPosts, setAllPosts] = useState<FeedPost[]>(seedPosts);
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
            id: `post-${Date.now()}`,
            title: trimmedBody.slice(0, 5) || 'New post',
            body: trimmedBody,
            timestamp: 'Just now',
            likes: 0,
            comments: 0,
            displayName: resolvedDisplayName,
            username: resolvedUsername,
            mediaUrls: [...draftMediaUrls]
        };

        setAllPosts((prev) => [nextPost, ...prev]);
        setIsCreateDialogOpen(false);
        setDraftMediaUrls([]);
        setDraftBody('');
    };

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
                        {allPosts.map((post) => (
                            <UserPost
                                key={post.id}
                                title={post.title}
                                body={post.body}
                                timestamp={post.timestamp}
                                likes={post.likes}
                                comments={post.comments}
                                displayName={post.displayName}
                                username={post.username}
                                mediaUrls={post.mediaUrls}
                            />
                        ))}
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