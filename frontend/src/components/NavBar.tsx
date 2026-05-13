import { AccountCircle, Business, Notifications, Search, Settings, 
    Logout, Person } from "@mui/icons-material";
import { useEffect, useState, useRef } from 'react';
import { Link } from "react-router-dom";
export default function NavBar({ setAppView }: { setAppView: React.Dispatch<React.SetStateAction<string>> }) {
    const [isSearchFocused, setSearchFocused] = useState(false);
    const [isProfileMenuOpen, setProfileMenuOpen] = useState(false);
    const [isNotificationsOpen, setNotificationsOpen] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const searchContainerRef = useRef<HTMLDivElement>(null);
    const notificationsRef = useRef<HTMLDivElement>(null);
    const profileRef = useRef<HTMLDivElement>(null);
    const [suggestions] = useState(['League of Legends', 'Valorant', 'Minecraft', 
        'Fortnite', 'Apex Legends', 'Overwatch', 'Call of Duty', 'CS:GO', 'Dota 2', 
        'World of Warcraft', 'Creator Name 1', 'Creator Name 2', 'Creator Name 3']);

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

    return (
        <nav>
            <div className="nav-company-name">
                <Business className="nav-icon"/>
                <Link to="/" className="nav-company-name-link">UWU~VIBE</Link>
            </div>
            <div ref={searchContainerRef} className={`nav-search-container` + (isSearchFocused ? ' focused' : '')}>
                <div className="nav-search-input" onClick={() => setSearchFocused(true)}>
                    <Search className="search-icon"/>
                    <input type="text"  placeholder="Search games..." 
                        value={searchValue} 
                        onChange={(e) => setSearchValue(e.target.value)} 
                        onFocus={() => { setSearchFocused(true) }}></input>
                </div>
                {isSearchFocused && (
                    <div className="nav-search-suggestions">
                        {(() => {
                            const filtered = suggestions.filter(suggestion => suggestion.toLowerCase().includes(searchValue.toLowerCase())).slice(0, 5);
                            return filtered.length > 0 ? 
                                filtered.map((suggestion) => (
                                    <div key={suggestion} className="nav-search-suggestion">{suggestion}</div>
                                ))
                                : <div className="nav-search-suggestion">{searchValue}</div>;
                        })()}
                    </div>
                )}
            </div>
            <div className="nav-profile-and-notifications-container">
                <div className="notification-wrapper">
                    <div ref={notificationsRef}> 
                        <Notifications className={`nav-icon notifications-icon ${isNotificationsOpen ? 'active' : ''}`} onClick={() => setNotificationsOpen(!isNotificationsOpen)}/> 
                    </div>
                    {isNotificationsOpen && (
                        <div className="nav-notifications-menu">
                            <div className="nav-notifications-menu-item">Notification 1</div>
                            <div className="nav-notifications-menu-item">Notification 2</div>
                            <div className="nav-notifications-menu-item">Notification 3</div>
                        </div>
                    )}
                </div>
                <div className="profile-wrapper" ref={profileRef}>
                    <div>
                        <AccountCircle className={`nav-icon profile-icon ${isProfileMenuOpen ? 'active' : ''}`} onClick={() => setProfileMenuOpen(!isProfileMenuOpen)}/>
                    </div>
                    {isProfileMenuOpen && (
                        <div className="nav-profile-menu">
                            <div className="nav-profile-menu-item" onClick={()=> setAppView("profile")}>
                                <Person className="nav-profile-menu-icon"/>
                                <span>Profile</span>
                            </div>
                            <div className="nav-profile-menu-item">
                                <Settings className="nav-profile-menu-icon"/>
                                <span>Settings</span>
                            </div>
                            <div className="nav-profile-menu-item">
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