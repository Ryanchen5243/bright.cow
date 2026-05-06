import { AccountCircle } from "@mui/icons-material";
import { Business } from "@mui/icons-material";
import { Notifications } from '@mui/icons-material';
import { Search } from '@mui/icons-material';
import { useEffect, useState } from 'react';
export default function NavBar() {
    const [isFocused, setFocused] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [suggestions] = useState(['league of legends', 'valorant', 'minecraft', 
        'fortnite', 'apex legends', 'overwatch', 'call of duty', 'cs:go', 'dota 2', 
        'world of warcraft']);
    
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const searchContainer = document.querySelector('.nav-search-container');
            if (searchContainer && !searchContainer.contains(event.target as Node)) {
                setFocused(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isFocused]);
    
    return (
        <nav>
            <div className="nav-company-name">
                <Business className="nav-icon"/>
                <p>UWU~VIBE</p>
            </div>
            <div className={`nav-search-container` + (isFocused ? ' focused' : '')}>
                <div className="nav-search-input" onClick={() => setFocused(true)}>
                    <Search className="search-icon"/>
                    <input type="text"  placeholder="Search games..." 
                        value={searchValue} 
                        onChange={(e) => setSearchValue(e.target.value)} 
                        onFocus={() => { setFocused(true) }}></input>
                </div>
                {isFocused && (
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
                <AccountCircle className="nav-icon"/>
            </div>
        </nav>
    )
}