import pfp from '../assets/default_profile_photo.jpg';

type UserPostProps = {
    title: string;
    body: string;
    timestamp: string;
    likes: number;
    comments: number;
    tag: string;
};

export default function UserPost({ title, body, timestamp, likes, comments, tag }: UserPostProps) {
    return (
        <article className="user-post">
            <div className="user-post-avatar">
                <img src={pfp} alt="Luna avatar" />
            </div>
            <div className="user-post-content">
                <div className="user-post-header">
                    <div>
                        <h3>Luna Wang</h3>
                        <p>@lunawang</p>
                    </div>
                    <span>{timestamp}</span>
                </div>
                <div className="user-post-tag">{tag}</div>
                <h4>{title}</h4>
                <p>{body}</p>
                <div className="user-post-actions">
                    <button type="button">{likes} likes</button>
                    <button type="button">{comments} comments</button>
                </div>
            </div>
        </article>
    );
}