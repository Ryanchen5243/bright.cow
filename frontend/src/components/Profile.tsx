import bg from '../assets/default_background_img.png';
import pfp from '../assets/default_profile_photo.jpg';
import { useState } from 'react';
import { Adjust, Edit, Group, SportsEsportsOutlined, SmartDisplay, Message, StarBorder } from '@mui/icons-material';
import CreatorSchedule from './CreatorSchedule';
export default function Profile() {
    const [profileTab, setProfileTab] = useState("overview");
    // user customizations
    const [isLoggedIn] = useState(true);
    const [userBio, setUserBio] = useState("Born in Washington DC 1992. I am your girl next door. looking for a man to play valorant with 😉. If you are interested hit me up. Dont be shy");
    const [isEditingBio, setIsEditingBio] = useState(false);
    const [draftBio, setDraftBio] = useState(userBio);
    const startEditBio = () => {
        setDraftBio(userBio);
        setIsEditingBio(true);
    }
    const saveBio = () => {
        setUserBio(draftBio);
        setIsEditingBio(false);
    }
    const cancelEditBio = () => {
        setDraftBio(userBio);
        setIsEditingBio(false);
    }
    
    return (
        <div className="profile-view">
            <div className="profile-header" style={{ background: `linear-gradient(to bottom,rgba(0,0,0,0.15),rgba(0,0,0,0.7)), url(${bg})`, backgroundSize: "cover", backgroundPosition: "center"}}>
                <div className="profile-user-photo">
                    <img src={pfp} alt="profile photo" />
                </div>
                <div className="profile-header-user-details-container">
                    <div className="profile-header-user-details-and-cta">
                        <div className="profile-header-user-details">
                            <div className="profile-header-user-headline"><h1>Luna</h1></div>
                            <div className="profile-header-user-headline-supporting">
                                <span>@itsluna</span>
                                <span>online</span>
                            </div>
                        </div>
                        <div className="profile-header-cta">
                            <button className="profile-header-cta-book" onClick={() => setProfileTab("schedule")}><h3>Book a Session</h3></button>
                            <button className="profile-header-cta-follow" onClick={() => alert('Message feature coming soon!')}><h3>Message</h3></button>
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
                <p className={`${profileTab === "overview" ? "active" : ""}`} onClick={()=> setProfileTab("overview")}>Overview</p>
                <p className={`${profileTab === "games" ? "active" : ""}`} onClick={()=> setProfileTab("games")}>Games</p>
                <p className={`${profileTab === "schedule" ? "active" : ""}`} onClick={()=> setProfileTab("schedule")}>Schedule</p>
                <p className={`${profileTab === "media" ? "active" : ""}`} onClick={()=> setProfileTab("media")}>Media</p>
                <p className={`${profileTab === "reviews" ? "active" : ""}`} onClick={()=> setProfileTab("reviews")}>Reviews</p>
            </div>
            <div className="profile-main">
                {profileTab === "overview" && <>
                    <div className="profile-services-offered">
                        <div className="profile-services-offered-header">
                            <SportsEsportsOutlined fontSize='large' htmlColor="#9557ED"/>
                            <h3>Services</h3>
                        </div>
                        <p>Choose a service and game with Luna!</p>
                        <div className="profile-service-card">
                            <Group fontSize='large' htmlColor="#9557ED"/>
                            <div className="profile-service-card-detail">
                                <h3>Duo Gaming</h3>
                                <p>Play together and have fun!</p>
                            </div>
                            <div className="profile-service-card-price">
                                <h3>$30</h3>
                                <p>/1 hour</p>
                            </div>
                        </div>
                        <div className="profile-service-card">
                            <Adjust fontSize='large' htmlColor="#9557ED"/>
                            <div className="profile-service-card-detail">
                                <h3>Valorant Coaching</h3>
                                <p>Improve your skills & rank up!</p>
                            </div>
                            <div className="profile-service-card-price">
                                <h3>$35</h3>
                                <p>/1 hour</p>
                            </div>
                        </div>
                        <div className="profile-service-card">
                            <SmartDisplay fontSize='large' htmlColor="#9557ED"/>
                            <div className="profile-service-card-detail">
                                <h3>VOD Review</h3>
                                <p>Detailed review and tips</p>
                            </div>
                            <div className="profile-service-card-price">
                                <h3>$25</h3>
                                <p>/1 session</p>
                            </div>
                        </div>
                        <div className="profile-service-card">
                            <Message fontSize='large' htmlColor="#9557ED"/>
                            <div className="profile-service-card-detail">
                                <h3>Chill & talk</h3>
                                <p>Just vibe & talk about anything</p>
                            </div>
                            <div className="profile-service-card-price">
                                <h3>$15</h3>
                                <p>/1 hour</p>
                            </div>
                        </div>
                        <div className="profile-service-card">
                            <StarBorder fontSize='large' htmlColor="#9557ED"/>
                            <div className="profile-service-card-detail">
                                <h3>Custom Session</h3>
                                <p>Tell me what you want!</p>
                            </div>
                            <div className="profile-service-card-price">
                                <h3>$30+</h3>
                                <p>/custom</p>
                            </div>
                        </div>
                        <button><h3>View All Services</h3></button>
                    </div>
                    <div className="profile-user-bio">
                        <div className="profile-user-bio-header">
                            <h3>Bio</h3>
                            <Edit onClick={startEditBio} />
                        </div>
                        <div className="profile-user-bio-content">
                            {!isEditingBio && <div className="profile-user-bio-display">
                                {userBio}
                            </div>}
                            {isEditingBio && <div className="profile-user-bio-edit">
                                <textarea className="profile-user-bio-textarea" value={draftBio} onChange={(e) => setDraftBio(e.target.value)} />
                                <div className="profile-user-bio-edit-cta">
                                    <button onClick={saveBio}>Save</button>
                                    <button onClick={cancelEditBio}>Cancel</button>
                                </div>
                            </div>}
                        </div>
                    </div>
                    <div className="profile-gifts-donation">
                        <h3 className="profile-gifts-donation-header">Send a Gift</h3>
                        <p>Show some love to Luna!</p>
                        <h1>this is h1</h1>
                        <h2>this is h2</h2>
                        <h3>this is h3</h3>
                        <h4>this is h4</h4>
                        <h5>this is h5</h5>
                        <h6>this is h6</h6>
                        <p>this is p</p>
                    </div>
                    </>
                }
                {profileTab === "games" && <h1>games</h1>}
                {profileTab === "schedule" && <CreatorSchedule isLoggedIn={isLoggedIn} />}
                {profileTab === "media" && <h1>media</h1>}
                {profileTab === "reviews" && <h1>reviews</h1>}
            </div>
        </div>
    );
}