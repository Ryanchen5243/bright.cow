import { NotificationsNoneOutlined, Search, Settings, Logout, Person } from "@mui/icons-material";
import { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { doSignOut } from "../firebase/auth.ts";
import { type AppView } from "./AppMain";

const suggestions = [
    { label: 'Valorant', type: 'Game' },
    { label: 'League of Legends', type: 'Game' },
    { label: 'Minecraft', type: 'Game' },
    { label: 'Apex Legends', type: 'Game' },
    { label: 'Luna', type: 'Creator' },
    { label: 'Creator Name 1', type: 'Creator' },
    { label: 'Late Night Ranked', type: 'Tag' },
    { label: 'Chill Vibes', type: 'Tag' },
    { label: 'VOD Review', type: 'Service' }
];

function BrandMark() {
    return (
        <svg className="nav-brand-mark" viewBox="0 0 32 32" aria-hidden="true">
            <rect x="4" y="5" width="24" height="22" rx="8" />
            <path d="M11 21V11h2.6l5.4 6.4V11H21v10h-2.4l-5.6-6.6V21H11Z" />
        </svg>
    );
}

export default function NavBar({ setAppView }: { setAppView: (view: AppView) => void }) {
    const navigate = useNavigate();
    const [isSearchFocused, setSearchFocused] = useState(false);
    const [isProfileMenuOpen, setProfileMenuOpen] = useState(false);
    const [isNotificationsOpen, setNotificationsOpen] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const searchContainerRef = useRef<HTMLDivElement>(null);
    const notificationsRef = useRef<HTMLDivElement>(null);
    const profileRef = useRef<HTMLDivElement>(null);

    const filteredSuggestions = suggestions
        .filter(({ label }) => label.toLowerCase().includes(searchValue.toLowerCase()))
        .slice(0, 6);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
                setSearchFocused(false);
            }
            if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
                setProfileMenuOpen(false);
            }
            if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
                setNotificationsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleLogout = async () => {
        try {
            await doSignOut();
            setAppView("home");
            setProfileMenuOpen(false);
            navigate("/", { replace: true });
        } catch (error) {
            console.error("Failed to sign out", error);
        }
    };

    return (
        <nav>
            <div className="nav-company-name">
                <Link to="/" className="nav-company-name-link" aria-label="Konevo home">
                    <BrandMark />
                    <span className="nav-company-name-text">Konevo</span>
                </Link>
            </div>
            <div ref={searchContainerRef} className={`nav-search-container` + (isSearchFocused ? ' focused' : '')}>
                <div className="nav-search-input" onClick={() => setSearchFocused(true)}>
                    <Search className="search-icon"/>
                    <input type="text"  placeholder="Search creators, games, or tags..." 
                        value={searchValue} 
                        onChange={(e) => setSearchValue(e.target.value)} 
                        onFocus={() => { setSearchFocused(true) }}></input>
                </div>
                {isSearchFocused && (
                    <div className="nav-search-suggestions">
                        <div className="nav-search-suggestions-header">Suggested matches</div>
                        {filteredSuggestions.length > 0 ? 
                            filteredSuggestions.map((suggestion) => (
                                <button
                                    key={suggestion.label}
                                    type="button"
                                    className="nav-search-suggestion"
                                    onClick={() => {
                                        setSearchValue(suggestion.label);
                                        setSearchFocused(false);
                                    }}
                                >
                                    <span className="nav-search-suggestion-label">{suggestion.label}</span>
                                    <span className="nav-search-suggestion-type">{suggestion.type}</span>
                                </button>
                            ))
                            : <div className="nav-search-empty-state">No matches for "{searchValue}"</div>}
                    </div>
                )}
            </div>
            <div className="nav-profile-and-notifications-container">
                <div className="notification-wrapper" ref={notificationsRef}>
                    <div>
                        <button
                            type="button"
                            className={`nav-action-button ${isNotificationsOpen ? 'active' : ''}`}
                            aria-label="Open notifications"
                            onClick={() => setNotificationsOpen(!isNotificationsOpen)}
                        >
                            <NotificationsNoneOutlined className="nav-icon notifications-icon" />
                        </button>
                    </div>
                    {isNotificationsOpen && (
                        <div className="nav-notifications-menu">
                            <div className="nav-menu-section-label">Notifications</div>
                            <div className="nav-notifications-menu-item">
                                <strong>Session request</strong>
                                <span>Luna accepted a Friday evening booking request.</span>
                            </div>
                            <div className="nav-notifications-menu-item">
                                <strong>New message</strong>
                                <span>You have a reply in your coaching thread.</span>
                            </div>
                            <div className="nav-notifications-menu-item">
                                <strong>Product update</strong>
                                <span>Search and scheduling received a small polish pass.</span>
                            </div>
                        </div>
                    )}
                </div>
                <div className="profile-wrapper" ref={profileRef}>
                    <button
                        type="button"
                        className={`nav-profile-trigger ${isProfileMenuOpen ? 'active' : ''}`}
                        aria-label="Open profile menu"
                        onClick={() => setProfileMenuOpen(!isProfileMenuOpen)}
                    >
                        <span className="nav-profile-avatar">KV</span>
                    </button>
                    {isProfileMenuOpen && (
                        <div className="nav-profile-menu">
                            <div className="nav-menu-section-label">Account</div>
                            <div className="nav-profile-menu-item" onClick={()=> setAppView("profile")}>
                                <Person className="nav-profile-menu-icon"/>
                                <span>Profile</span>
                            </div>
                            <div className="nav-profile-menu-item" onClick={()=> setAppView("settings")}>
                                <Settings className="nav-profile-menu-icon"/>
                                <span>Settings</span>
                            </div>
                            <div className="nav-profile-menu-item" onClick={handleLogout}>
                                <Logout className="nav-profile-menu-icon"/>
                                <span>Logout</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    )
}