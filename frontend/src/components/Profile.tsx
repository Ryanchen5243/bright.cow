import bg from '../assets/default_background_img.png';
import pfp from '../assets/default_profile_photo.jpg';
import { useState } from 'react';
import { Adjust, Edit, Group, SportsEsportsOutlined, SmartDisplay, Message, StarBorder, Translate, Public, WatchLater } from '@mui/icons-material';
import CreatorSchedule from './CreatorSchedule';
import rose_gift from '../assets/profile_gifts/rose_gift.png';
import teddy_bear_gift from '../assets/profile_gifts/teddy_bear_gift.png';
import boquet_gift from '../assets/profile_gifts/bouquet_gift.png';
import hearts_gift from '../assets/profile_gifts/hearts_gift.png';
import gift_box_gift from '../assets/profile_gifts/gift_box_gift.png';
import lambo_gift from '../assets/profile_gifts/lambo_gift.png';
import champagne_gift from '../assets/profile_gifts/champagne_gift.png';
import shipppp_gift from '../assets/profile_gifts/shipppp_gift.png';
import UserPost from './UserPost';
import Posts from './Posts';

const profileTabs = ['overview', 'posts', 'games', 'schedule', 'media', 'reviews'] as const;

const serviceCards = [
    { title: 'Duo Gaming', description: 'Queue together, warm up fast, and keep the energy high.', price: '$30', unit: '/hour', icon: Group },
    { title: 'Valorant Coaching', description: 'Tactical reviews focused on aim, utility, and confidence.', price: '$35', unit: '/hour', icon: Adjust },
    { title: 'VOD Review', description: 'Actionable notes with clips, patterns, and improvement priorities.', price: '$25', unit: '/session', icon: SmartDisplay },
    { title: 'Chill & Talk', description: 'Low-pressure hangouts for conversation, co-working, or debriefs.', price: '$15', unit: '/hour', icon: Message },
    { title: 'Custom Session', description: 'Design a session around your game, goals, and schedule.', price: '$30+', unit: '/custom', icon: StarBorder }
];

const quickFacts = [
    { label: 'Languages', value: 'English, Korean', icon: Translate },
    { label: 'Location', value: 'New York, USA', icon: Public },
    { label: 'Avg Response', value: '1 hour', icon: WatchLater }
];

const recentPosts = [
    {
        title: 'Shipping a cleaner booking flow this week',
        body: 'Tightening up my late-night Valorant sessions so it is easier to book ranked, VOD review, or a low-key duo queue without the back-and-forth.',
        timestamp: '2h ago',
        likes: 84,
        comments: 12
    },
    {
        title: 'Current focus: confidence + comms',
        body: 'Most players do not need more raw mechanics first. They need sharper comms, cleaner pacing, and someone to make the next game feel winnable again.',
        timestamp: 'Yesterday',
        likes: 61,
        comments: 8
    },
    {
        title: 'Open slots for weekend sessions',
        body: 'Added extra availability for Friday and Saturday. If you want structured help without the rigid coaching vibe, this is the best window to grab.',
        timestamp: '3d ago',
        likes: 49,
        comments: 5
    }
];

const giftItems = [
    { id: 'rose', image: rose_gift, alt: 'rose gift', price: 100, name: 'Rose' },
    { id: 'bouquet', image: boquet_gift, alt: 'bouquet gift', price: 300, name: 'Bouquet' },
    { id: 'hearts', image: hearts_gift, alt: 'hearts gift', price: 400, name: 'Hearts' },
    { id: 'teddy', image: teddy_bear_gift, alt: 'teddy bear gift', price: 200, name: 'Teddy Bear' },
    { id: 'gift-box', image: gift_box_gift, alt: 'gift box gift', price: 500, name: 'Gift Box' },
    { id: 'lambo', image: lambo_gift, alt: 'lambo gift', price: 1000, name: 'Lambo' },
    { id: 'champagne', image: champagne_gift, alt: 'champagne gift', price: 1500, name: 'Champagne' },
    { id: 'ship', image: shipppp_gift, alt: 'ship gift', price: 2000, name: 'Ship' }
];

export default function Profile() {
    const [profileTab, setProfileTab] = useState("overview");
    // user customizations
    const [isLoggedIn] = useState(true);
    const [userBio, setUserBio] = useState('Creator for players who want a sharp, low-pressure space to improve. I blend ranked energy, clean coaching, and chill conversation so sessions feel more like shipping momentum than grinding solo queue in circles.');
    const [isEditingBio, setIsEditingBio] = useState(false);
    const [draftBio, setDraftBio] = useState(userBio);
    const [selectedGift, setSelectedGift] = useState(giftItems[0].id);

    const startEditBio = () => {
        setDraftBio(userBio);
        setIsEditingBio(true);
    };

    const saveBio = () => {
        setUserBio(draftBio);
        setIsEditingBio(false);
    };

    const cancelEditBio = () => {
        setDraftBio(userBio);
        setIsEditingBio(false);
    };

    return (
        <div className="profile-view">
            <div className="profile-header" style={{ background: `linear-gradient(135deg, rgba(10, 14, 24, 0.18), rgba(10, 14, 24, 0.82)), url(${bg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="profile-user-photo-shell">
                    <div className="profile-user-photo">
                        <img src={pfp} alt="profile photo" />
                    </div>
                </div>
                <div className="profile-header-user-details-container">
                    <div className="profile-header-user-details">
                        <div className="profile-header-user-headline"><h1>Luna</h1></div>
                        <div className="profile-header-user-headline-supporting">
                            <span>@itsluna</span>
                            <span>online</span>
                        </div>
                    </div>
                    <div className="profile-header-footer">
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
                        <div className="profile-header-cta">
                            <button className="profile-header-cta-book" onClick={() => setProfileTab('schedule')}><h3>Book a Session</h3></button>
                            <button className="profile-header-cta-follow" onClick={() => alert('Message feature coming soon!')}><h3>Message</h3></button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="profile-main-tabs">
                {profileTabs.map((tab) => (
                    <button key={tab} type="button" className={`${profileTab === tab ? 'active' : ''}`} onClick={() => setProfileTab(tab)}>
                        {tab}
                    </button>
                ))}
            </div>
            <div className="profile-main">
                {profileTab === "overview" && <>
                    <div className="profile-overview-grid">
                        <div className="profile-services-offered profile-panel">
                            <div className="profile-panel-heading">
                                <SportsEsportsOutlined fontSize="large" htmlColor="#9557ED" />
                                <div>
                                    <h3>Services</h3>
                                </div>
                            </div>
                            <p>Pick a format that matches the energy you want from the session.</p>
                            {serviceCards.map(({ title, description, price, unit, icon: Icon }) => (
                                <div className="profile-service-card" key={title}>
                                    <div className="profile-service-card-icon">
                                        <Icon fontSize="medium" htmlColor="#9557ED" />
                                    </div>
                                    <div className="profile-service-card-detail">
                                        <h3>{title}</h3>
                                        <p>{description}</p>
                                    </div>
                                    <div className="profile-service-card-price">
                                        <h3>{price}</h3>
                                        <p>{unit}</p>
                                    </div>
                                </div>
                            ))}
                            <button type="button"><h3>View All Services</h3></button>
                        </div>
                        <div className="profile-user-bio-and-recent-posts">
                            <div className="profile-user-bio profile-panel">
                                <div className="profile-user-bio-header">
                                    <div>
                                        <h3>Bio</h3>
                                    </div>
                                    <button type="button" className="profile-icon-button" onClick={startEditBio}>
                                        <Edit />
                                    </button>
                                </div>
                                <div className="profile-user-bio-content">
                                    {!isEditingBio && <div className="profile-user-bio-display">
                                        <div>{userBio}</div>
                                    </div>}
                                    {isEditingBio && <div className="profile-user-bio-edit">
                                        <textarea className="profile-user-bio-textarea" value={draftBio} onChange={(e) => setDraftBio(e.target.value)} />
                                        <div className="profile-user-bio-edit-cta">
                                            <button type="button" onClick={saveBio}>Save</button>
                                            <button type="button" className="secondary" onClick={cancelEditBio}>Cancel</button>
                                        </div>
                                    </div>}
                                </div>
                                <div className="profile-user-bio-footer">
                                    {quickFacts.map(({ label, value, icon: Icon }) => (
                                        <div className="profile-user-bio-footer-item" key={label}>
                                            <Icon fontSize="large" htmlColor="#9557ED" />
                                            <div>
                                                <p>{label}</p>
                                                <h3>{value}</h3>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="profile-user-recent-posts profile-panel">
                                <div className="profile-panel-heading">
                                    <div>
                                        <h3>Recent posts</h3>
                                        <button type="button" onClick={() => setProfileTab("posts")}><h3>View All</h3></button>
                                    </div>
                                </div>
                                <div className="profile-user-recent-posts-list">
                                    {recentPosts.map((post) => (
                                        <UserPost key={post.title} {...post} />
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="profile-gifts-donation profile-panel">
                            <div className="profile-panel-heading">
                                <div>
                                    <h3 className="profile-gifts-donation-header">Send a Gift</h3>
                                </div>
                            </div>
                            <p>Back the creator with something playful and premium.</p>
                            <div className="profile-gifts-donation-items">
                                {giftItems.map((gift) => (
                                    <button
                                        key={gift.id}
                                        type="button"
                                        className={`profile-gifts-donation-item ${selectedGift === gift.id ? 'selected' : ''}`}
                                        onClick={() => setSelectedGift(gift.id)}
                                    >
                                        <img src={gift.image} alt={gift.alt} />
                                        <span>{gift.name}</span>
                                        <p>{gift.price}</p>
                                    </button>
                                ))}
                            </div>
                            <button type="button" className="profile-gifts-donation-send-button"><h3>Send Selected Gift</h3></button>
                        </div>
                    </div>
                    </>
                }
                {profileTab === "posts" && <Posts />}
                {profileTab === "games" && <h1>games</h1>}
                {profileTab === "schedule" && <CreatorSchedule isLoggedIn={isLoggedIn} />}
                {profileTab === "media" && <h1>media</h1>}
                {profileTab === "reviews" && <h1>reviews</h1>}
            </div>
        </div>
    );
}