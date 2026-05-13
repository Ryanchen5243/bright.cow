import { Link } from "react-router-dom";

export default function LandingPage() {
    return (
        <div className="landing-page">
            <h1>Welcome to UWU~VIBE!</h1>
            <p>Your one-stop platform for gaming, socializing, and more. Explore our features and join the fun today!</p>
            <Link to="/app" className="landing-cta-button">Enter the App</Link>
            <span>alternative edits </span>
        </div>
    );
}
