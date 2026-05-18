import bg from '../assets/default_background_photo.jpg';
import pfp from '../assets/default_profile_photo.jpg';
import { useState } from 'react';
import { Edit } from '@mui/icons-material';
import CreatorSchedule from './CreatorSchedule';
export default function Profile() {
    const [profileTab, setProfileTab] = useState("overview");
    // user customizations
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [userBio, setUserBio] = useState("Born in Washington DC 1992. I am your girl next door. looking for a man to play valorant with 😉. If you are interested hit me up. Dont be shy");
    return (
        <div className="profile-view">
            <div className="profile-header">
                <div className="profile-header-background" style={{ backgroundImage: `url(${bg})` }}></div>
                <div className="profile-user-photo">
                    <img src={pfp} alt="profile photo" />
                </div>
                <div className="profile-header-user-details-container">
                    <div className="profile-header-user-details-and-cta">
                        <div className="profile-header-user-details">
                            <div className="profile-header-user-headline"><h1 className="h1-style">Luna</h1></div>
                            <div className="profile-header-user-headline-supporting">
                                <span>@itsluna</span>
                                <span>online</span>
                            </div>
                        </div>
                        <div className="profile-header-cta">
                            <button className="profile-header-cta-book" onClick={() => setProfileTab("schedule")}>Book a Session</button>
                            <button className="profile-header-cta-follow" onClick={() => alert('Message feature coming soon!')}>Message</button>
                        </div>
                    </div>
                    <div className="profile-header-user-metrics-and-tags">
                        <div className="profile-header-user-metrics">
                            <span>4.9 (128 reviews)</span>
                            <span>1.2k followers</span>
                        </div>
                        <div className="profile-header-user-tags">
                            <span className="profile-header-user-tag-fps-games">FPS Games</span>
                            <span className="profile-header-user-tag-variety-streamer">Variety Streamer</span>
                            <span className="profile-header-user-tag-chill-vibes">Chill Vibes</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="profile-main-tabs">
                <span className={profileTab === "overview" ? "active" : ""} onClick={()=> setProfileTab("overview")}>Overview</span>
                <span className={profileTab === "games" ? "active" : ""} onClick={()=> setProfileTab("games")}>Games</span>
                <span className={profileTab === "schedule" ? "active" : ""} onClick={()=> setProfileTab("schedule")}>Schedule</span>
                <span className={profileTab === "media" ? "active" : ""} onClick={()=> setProfileTab("media")}>Media</span>
            </div>
            <div className="profile-main">
                {profileTab === "overview" && 
                    <div className="profile-user-bio">
                        <div className="profile-user-bio-header">
                            <h3 className="h3-style">About Me</h3>
                            <Edit />
                        </div>
                        <div className="profile-user-bio-content">
                            <p>{userBio.split('. ').map((line, index) => (
                                <span key={index}>{line}.<br /></span>
                            ))}</p>
                        </div>
                    </div>
                }
                {profileTab === "games" && <h1>games</h1>}
                {profileTab === "schedule" && <CreatorSchedule isLoggedIn={isLoggedIn} />}
                {profileTab === "media" && <h1>media</h1>}
            </div>
        </div>
    );
}