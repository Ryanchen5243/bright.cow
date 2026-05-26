import bg from '../assets/default_background_img.png';
import pfp from '../assets/default_profile_photo.jpg';
import { useState } from 'react';
import { Adjust, Edit, Group, SportsEsportsOutlined, SmartDisplay, Message, StarBorder, Translate, Public, WatchLater } from '@mui/icons-material';
import CreatorSchedule from './CreatorSchedule';
import rose_gift from '../assets/rose_gift.png';
import teddy_bear_gift from '../assets/teddy_bear_gift.png';
import boquet_gift from '../assets/bouquet_gift.png';
import hearts_gift from '../assets/hearts_gift.png';
import gift_box_gift from '../assets/gift_box_gift.png';
import lambo_gift from '../assets/lambo_gift.png';
import champagne_gift from '../assets/champagne_gift.png';
import shipppp_gift from '../assets/shipppp_gift.png';
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
                <p className={`${profileTab === "posts" ? "active" : ""}`} onClick={()=> setProfileTab("posts")}>Posts</p>
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
                    <div className="profile-user-bio-and-recent-posts">
                        <div className="profile-user-bio">
                            <div className="profile-user-bio-header">
                                <h3>Bio</h3>
                                <Edit onClick={startEditBio} />
                            </div>
                            <div className="profile-user-bio-content">
                                {!isEditingBio && <div className="profile-user-bio-display">
                                    <div>{userBio}</div>
                                </div>}
                                {isEditingBio && <div className="profile-user-bio-edit">
                                    <textarea className="profile-user-bio-textarea" value={draftBio} onChange={(e) => setDraftBio(e.target.value)} />
                                    <div className="profile-user-bio-edit-cta">
                                        <button onClick={saveBio}>Save</button>
                                        <button onClick={cancelEditBio}>Cancel</button>
                                    </div>
                                </div>}
                            </div>
                            <div className="profile-user-bio-footer">
                                <div className="profile-user-bio-footer-item">
                                    <Translate fontSize='large' htmlColor="#9557ED"/>
                                    <div>
                                        <p>Languages</p>
                                        <h3>English, Korean</h3>
                                    </div>
                                </div>
                                <div className="profile-user-bio-footer-item">
                                    <Public fontSize='large' htmlColor="#9557ED"/>
                                    <div>
                                        <p>Location</p>
                                        <h3>New York, USA</h3>
                                    </div>
                                </div>
                                <div className="profile-user-bio-footer-item">
                                    <WatchLater fontSize='large' htmlColor="#9557ED"/>
                                    <div>
                                        <p>Avg Response</p>
                                        <h3>1 hour</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="profile-user-recent-posts">
                            <h1>post 1</h1>
                            <h1>post 2</h1>
                            <h1>post 3</h1>
                        </div>
                    </div>
                    <div className="profile-gifts-donation">
                        <h3 className="profile-gifts-donation-header">Send a Gift</h3>
                        <p>Show some love to Luna!</p>
                        <div className="profile-gifts-donation-items">
                            <div className="profile-gifts-donation-item">
                                <img src={rose_gift} alt="rose gift" />
                                <p>100</p>
                            </div>
                            <div className="profile-gifts-donation-item">
                                <img src={boquet_gift} alt="boquet gift" />
                                <p>300</p>
                            </div>
                            <div className="profile-gifts-donation-item">
                                <img src={hearts_gift} alt="hearts gift" />
                                <p>400</p>
                            </div>
                            <div className="profile-gifts-donation-item">
                                <img src={teddy_bear_gift} alt="teddy bear gift" />
                                <p>200</p>
                            </div>
                            <div className="profile-gifts-donation-item">
                                <img src={gift_box_gift} alt="gift box gift" />
                                <p>500</p>
                            </div>
                            <div className="profile-gifts-donation-item">
                                <img src={lambo_gift} alt="lambo gift" />
                                <p>1000</p>
                            </div>
                            <div className="profile-gifts-donation-item">
                                <img src={champagne_gift} alt="champagne gift" />
                                <p>1500</p>
                            </div>
                            <div className="profile-gifts-donation-item">
                                <img src={shipppp_gift} alt="shipppp gift" />
                                <p>2000</p>
                            </div>
                        </div>
                        <button className="profile-gifts-donation-send-button"><h3>Send</h3></button>
                    </div>
                    </>
                }
                {profileTab === "posts" && <h1>posts</h1>}
                {profileTab === "games" && <h1>games</h1>}
                {profileTab === "schedule" && <CreatorSchedule isLoggedIn={isLoggedIn} />}
                {profileTab === "media" && <h1>media</h1>}
                {profileTab === "reviews" && <h1>reviews</h1>}
            </div>
        </div>
    );
}