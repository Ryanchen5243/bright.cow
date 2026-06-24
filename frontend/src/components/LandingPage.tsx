import { Business } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

export default function LandingPage() {
    const { currentUser } = useAuth();

    return (
        <div className="lv-page">

            {/* NAVBAR */}
            <nav className="lv-nav">
                <div className="lv-nav-left">
                    <Business className="lv-nav-icon" />
                    <Link to="/" className="lv-nav-logo">UWUVIBE</Link>
                </div>

                <div className="lv-nav-links">
                    <a href="#how" className="lv-nav-link">How It Works</a>
                    <a href="#creators" className="lv-nav-link">For Creators</a>
                    <a href="#safety" className="lv-nav-link">Safety</a>
                    <a href="#about" className="lv-nav-link">About Us</a>
                    <a href="#contact" className="lv-nav-link">Contact</a>

                    <Link
                        to={currentUser ? "/app" : "/login"}
                        className="lv-nav-btn"
                    >
                        Log In
                    </Link>

                    <Link
                        to={currentUser ? "/app" : "/login"}
                        className="lv-nav-btn-primary"
                    >
                        Join Beta
                    </Link>
                </div>
            </nav>

            {/* HERO */}
            <section className="lv-hero" aria-labelledby="hero-title">

                <div className="lv-hero-content">

                    <h1 id="hero-title" className="lv-title">
                        Meet your people —
                        <span className="lv-gradient"> real conversations, real connections.</span>
                    </h1>

                    <p className="lv-subtext">
                        UWUVIBE connects you with friendly creators for one-on-one chats,
                        gaming companions, and safe social experiences. Quick to join —
                        easy to book.
                    </p>

                    <div className="lv-buttons" role="group" aria-label="Primary calls to action">
                        <Link
                            to={currentUser ? "/app" : "/login"}
                            className="lv-btn-primary"
                            aria-label="Join the beta"
                        >
                            Join the Beta
                        </Link>

                        <Link
                            to="/creator-signup"
                            className="lv-btn-secondary"
                            aria-label="Become a creator"
                        >
                            Become a Creator
                        </Link>
                    </div>

                    <div className="lv-trust-row" aria-hidden="true">
                        <div className="lv-trust-item">✅ Safe & Verified</div>
                        <div className="lv-trust-item">💳 Secure Payments</div>
                        <div className="lv-trust-item">🌟 500+ Creators</div>
                    </div>

                </div>

                {/* RIGHT SIDE VISUAL */}
                <div className="lv-hero-visual" aria-hidden="true">
                    <div className="lv-glow-circle">
                        <div className="lv-glow-logo" aria-hidden>💜</div>
                        <div className="lv-glow-text">UWUVIBE<br />CONNECT. CHAT. VIBE.</div>
                    </div>

                    <div className="lv-floating-tags">
                        <span>#VoiceChat</span>
                        <span>#Gaming</span>
                        <span>#Anime</span>
                        <span>#Companion</span>
                        <span>#StudyBuddy</span>
                        <span>#LateNightTalks</span>
                    </div>
                </div>

            </section>

            {/* FEATURES */}
            <section className="lv-features">
                <div className="lv-feature-box">
                    <h4>🔒 Safe & Verified</h4>
                    <p>Your safety is our top priority.</p>
                </div>

                <div className="lv-feature-box">
                    <h4>💳 Secure Payments</h4>
                    <p>Encrypted and 100% protected.</p>
                </div>

                <div className="lv-feature-box">
                    <h4>🕒 24/7 Support</h4>
                    <p>We’re here for you anytime.</p>
                </div>

                <div className="lv-feature-box">
                    <h4>🌈 Positive Community</h4>
                    <p>Be yourself and feel welcomed.</p>
                </div>
            </section>

            {/* BOTTOM STATS */}
            <section className="lv-stats">
                <div className="lv-stat-box">
                    <h3>🚀 Coming Soon</h3>
                    <p>Launching Soon</p>
                </div>

                <div className="lv-stat-box">
                    <h3>10K+</h3>
                    <p>Future Connections</p>
                </div>

                <div className="lv-stat-box">
                    <h3>500+</h3>
                    <p>Creators Joining</p>
                </div>

                <div className="lv-stat-box">
                    <h3>24/7</h3>
                    <p>Support & Safety</p>
                </div>
            </section>

        </div>
    );
}
