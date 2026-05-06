import { AccountCircle } from "@mui/icons-material";
import { Business } from "@mui/icons-material";
import { Notifications } from '@mui/icons-material';
import { Search } from '@mui/icons-material';
import { useState } from 'react';
export default function NavBar() {
    const [openModal, setOpenModal] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [suggestions] = useState(['league of legends', 'valorant', 'minecraft', 'fortnite', 'apex legends']);
    
    
    return (
        <nav>
            <div className="nav-company-name">
                <Business className="nav-icon"/>
                <p>UWU~VIBE</p>
            </div>
            <div className="nav-search-container">
                <div className="nav-search-input" onClick={() => setOpenModal(true)}>
                    <Search className="search-icon"/>
                    <input type="text"  placeholder="Search games..." 
                        value={searchValue} 
                        onChange={(e) => setSearchValue(e.target.value)} 
                        onFocus={() => setOpenModal(true)} 
                        onBlur={() => setTimeout(() => setOpenModal(false), 200)}/>
                </div>
                {/* {openModal && (
                    <div className="search-suggestions-overlay">
                        {suggestions.filter(suggestion => suggestion.toLowerCase().includes(searchValue.toLowerCase())).map((suggestion, index) => (
                            <div key={index} className="search-suggestion-item">
                                <span>{suggestion}</span>
                            </div>
                        ))}
                    </div>
                )} */}
            </div>
            <div className="nav-profile-icon">
                <Notifications className="nav-icon"/>
                <AccountCircle className="nav-icon"/>
            </div>
        </nav>
    )
}