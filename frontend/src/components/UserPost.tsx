import pfp from '../assets/default_profile_photo.jpg'

export default function UserPost() {
    // user_id, post_id, content, timestamp, likes, comments, etc.
    const user_id = 1;
    const user_display_name = "Luna Wang";
    const username = "@lunawang";
    const post_id = 1;
    const content = "Hello world! This is my first post. My name is Luna Wang. My job is a developer. #excited #firstpost";
    const timestamp = new Date("2024-06-01T12:00:00Z");
    const likes = 10;
    const comments = [
        { comment_id: 1, user_id: 2, content: "Nice post!", timestamp: new Date("2024-06-01T12:30:00Z") },
        { comment_id: 2, user_id: 3, content: "I agree!", timestamp: new Date("2024-06-01T13:00:00Z") }
    ];
    const attachments = [
        { attachment_id: 1, type: "image", url: "https://example.com/image1.jpg" },
        { attachment_id: 2, type: "video", url: "https://example.com/video1.mp4" }
    ];
  return (
        <div className="user-post" data-user-id={user_id} data-post-id={post_id}>
        <div className="user-post-avatar">
            <img src={pfp} alt="avatar" />
        </div>
        <div className="user-post-content">
            <div>
                <h3>{user_display_name}</h3>
                <p>{username}</p>
            </div>
            <p>{content}</p>
            {attachments.map((attachment) => (
                <div key={attachment.attachment_id}>
                {attachment.type === "image" && <img src={attachment.url} alt="attachment" />}
                </div>
            ))}
            <div>
                {timestamp.toLocaleString()}
                <button onClick={() => alert("Liked!")}>Like {likes}</button>
                <button onClick={() => alert("Commented!")}>Comment ({comments.length})</button>
            </div>
        </div>
    </div>
  );
}