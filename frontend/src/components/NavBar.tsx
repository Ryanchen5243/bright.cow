import { AccountCircle, Business, Notifications, Search, Settings, 
    Logout, Person } from "@mui/icons-material";
import { useEffect, useState } from 'react';
export default function NavBar() {
    const [isSearchFocused, setSearchFocused] = useState(false);
    const [isProfileMenuOpen, setProfileMenuOpen] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [suggestions] = useState(['League of Legends', 'Valorant', 'Minecraft', 
        'Fortnite', 'Apex Legends', 'Overwatch', 'Call of Duty', 'CS:GO', 'Dota 2', 
        'World of Warcraft', 'Creator Name 1', 'Creator Name 2', 'Creator Name 3']);
    
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const searchContainer = document.querySelector('.nav-search-container');
            if (searchContainer && !searchContainer.contains(event.target as Node)) {
                setSearchFocused(false);
            }
            const profileIconContainer = document.querySelector('.nav-profile-icon');
            if (profileIconContainer && !profileIconContainer.contains(event.target as Node)) {
                setProfileMenuOpen(false);
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
                <p>UWU~VIBE</p>
            </div>
            <div className={`nav-search-container` + (isSearchFocused ? ' focused' : '')}>
                <div className="nav-search-input" onClick={() => setSearchFocused(true)}>
                    <Search className="search-icon"/>
                    <input type="text"  placeholder="Search games..." 
                        value={searchValue} 
                        onChange={(e) => setSearchValue(e.target.value)} 
                        onFocus={() => { setSearchFocused(true) }}></input>
                </div>
                {isSearchFocused && (
                    <div className="nav-search-suggestions">
                        {(suggestions.filter(suggestion => suggestion.toLowerCase().includes(searchValue.toLowerCase())).slice(0, 5).length > 0) ? 
                            suggestions.filter(suggestion => suggestion.toLowerCase().includes(searchValue.toLowerCase())).slice(0, 5).map((suggestion, index) => (
                                <div key={index} className="nav-search-suggestion">{suggestion}</div>
                            ))
                            : <div className="nav-search-suggestion">{searchValue}</div>
                        }
                    </div>
                )}
            </div>
            <div className="nav-profile-icon">
                <Notifications className="nav-icon"/>
                <AccountCircle className="nav-icon" onClick={() => setProfileMenuOpen(!isProfileMenuOpen)}/>
                {isProfileMenuOpen && (
                    <div className="nav-profile-menu">
                        <div className="nav-profile-menu-item">
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
        </nav>
    )
}