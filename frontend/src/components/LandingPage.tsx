import { Business } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

export default function LandingPage() {
    const { currentUser } = useAuth();

    return (
        <div className="landing-page">
            <nav>
                <div className="nav-company-name">
                    <Business className="nav-icon"/>
                    <Link to="/" className="nav-company-name-link">UWU~VIBE</Link>
                </div>
                <div className="nav-links">
                    <Link to={currentUser ? "/app" : "/login"} className="nav-link">Home</Link>
                    <a href="#features" className="nav-link">Features</a>
                    <a href="#about" className="nav-link">About Us</a>
                    <a href="#contact" className="nav-link">Contact</a>
                </div>
            </nav>
            <h1>Konevo LLC</h1>
            <p>Your one-stop platform for gaming, socializing, and more. Explore our features and join the fun today!</p>
            <Link to={currentUser ? "/app" : "/login"} className="landing-cta-button">Get Started</Link>
        </div>
    );
}