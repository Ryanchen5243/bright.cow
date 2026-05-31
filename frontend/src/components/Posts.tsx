import UserPost from './UserPost';

export default function Posts() {
    const allPosts = [
        {
            title: 'Shipping a cleaner booking flow this week',
            body: 'Tightening up my late-night Valorant sessions so it is easier to book ranked, VOD review, or a low-key duo queue without the back-and-forth.',
            timestamp: '2h ago',
            likes: 84,
            comments: 12
        },
        {
            title: 'Current focus: confidence + comms',
            body: 'Most players do not need more raw mechanics first. They need sharper comms, cleaner pacing, and someone to make the next game feel winnable again.',
            timestamp: 'Yesterday',
            likes: 61,
            comments: 8
        },
        {
            title: 'Open slots for weekend sessions',
            body: 'Added extra availability for Friday and Saturday. If you want structured help without the rigid coaching vibe, this is the best window to grab.',
            timestamp: '3d ago',
            likes: 49,
            comments: 5
        }
    ];
    return (
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
                    <h2>Posts</h2>
                    <p>Latest updates from creators and coaching circles.</p>
                </header>

                <div className="posts">
                    {allPosts.map((post) => (
                        <UserPost key={post.title} title={post.title} body={post.body} timestamp={post.timestamp} likes={post.likes} comments={post.comments} />
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
    )
}