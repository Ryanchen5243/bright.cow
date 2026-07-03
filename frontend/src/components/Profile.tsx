import bg from '../assets/default_background_img.png';
import pfp from '../assets/default_profile_photo.jpg';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Adjust, Edit, Group, SportsEsportsOutlined, SmartDisplay, Message, StarBorder, Translate, Public, WatchLater, type SvgIconComponent } from '@mui/icons-material';

const quickFactIconMap: Record<string, SvgIconComponent> = { Translate, Public, WatchLater };
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
import ScheduleCustomize from './ScheduleCustomize';

const profileTabs = ['overview', 'posts', 'games', 'schedule', 'media', 'reviews', 'ScheduleCustomize'] as const;
import { Business } from '@mui/icons-material';

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

export default function Profile({ creatorUserName }: { creatorUserName?: string }) {
    const [searchParams, setSearchParams] = useSearchParams();
    const rawTab = searchParams.get('tab');
    const profileTab = (profileTabs as readonly string[]).includes(rawTab ?? '') ? rawTab! : 'overview';
    const setProfileTab = (tab: string) => {
        setSearchParams((prev) => { prev.set('tab', tab); return prev; }, { replace: true });
    };

    const [creatorProfile, setCreatorProfile] = useState<any>(null); // avoid using -> tbd destructure profile data
    const [creatorUserDisplayName, setCreatorUserDisplayName] = useState<string | undefined>(undefined);
    const [creatorUUID, setCreatorUUID] = useState<string | null>(null); // to pass down via props for fetching posts, schedule, etc.
    const [userBio, setUserBio] = useState("");
    const [isEditingBio, setIsEditingBio] = useState(false);
    const [draftBio, setDraftBio] = useState(userBio);
    const [selectedGift, setSelectedGift] = useState(giftItems[0].id);

    useEffect(() => {
        let isCancelled = false;
        const loadCreatorProfile = async () => {
            try {
                const response = await fetch(new URL('../mocks/seedProfiles.json', import.meta.url).href);
                if (!response.ok) {
                    return;
                }

                const data = await response.json() as any[];
                const creators = Array.isArray(data) ? data : [];
                const resolvedCreator = creators.find((creator) => creator.userName === creatorUserName) ?? null;

                if (!isCancelled) {
                    setCreatorProfile(resolvedCreator);
                    setCreatorUUID(resolvedCreator?.id ?? null);
                    setCreatorUserDisplayName(resolvedCreator?.userDisplayName ?? undefined);
                    setUserBio(resolvedCreator?.userBio ?? "");
                    setDraftBio(resolvedCreator?.userBio ?? "");
                    setIsEditingBio(false);
                }
            } catch {
                if (!isCancelled) {
                    setCreatorProfile(null);
                    setUserBio("");
                    setDraftBio("");
                    setIsEditingBio(false);
                }
            }
        };

        loadCreatorProfile();
        return () => {
            isCancelled = true;
        };
    }, [creatorUserName]);

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
                        <img alt="profile photo" />
                    </div>
                </div>
                <div className="profile-header-user-details-container">
                    <div className="profile-header-user-details">
                        <div className="profile-header-user-headline"><h1>{creatorUserDisplayName}</h1></div>
                        <div className="profile-header-user-headline-supporting">
                            <span>{creatorProfile?.userName}</span>
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
                            {creatorProfile?.services?.map((service: any) => (
                                <div className="profile-service-card" key={`bar${Math.random()}`}>
                                    <div className="profile-service-card-icon">
                                        <Business fontSize="medium" htmlColor="#9557ED" />
                                    </div>
                                    <div className="profile-service-card-detail">
                                        <h3>{service.name}</h3>
                                        <p>{service.description}</p>
                                    </div>
                                    <div className="profile-service-card-price">
                                        <h3>{service.price}</h3>
                                        <p>unit here</p>
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
                                    {creatorProfile?.quickFacts?.map((fact: { label: string; value: string; icon: string }, index: number) => {
                                        const IconComponent = quickFactIconMap[fact.icon];
                                        return (
                                        <div className="profile-user-bio-footer-item" key={index}>
                                            {IconComponent && <IconComponent fontSize="large" htmlColor="#9557ED" />}
                                            <div>
                                                <p>{fact.label}</p>
                                                <h3>{fact.value}</h3>
                                            </div>
                                        </div>
                                        );
                                    })}
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
                                    {creatorProfile?.recentPosts?.map((post : any) => (
                                        <UserPost key={post.id} post={post} userName={creatorProfile?.userName ?? ''} displayName={creatorProfile?.userDisplayName ?? ''} />
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
                {profileTab === "posts" && <Posts creatorUUID={creatorUUID} userName={creatorProfile?.userName ?? ''} displayName={creatorUserDisplayName ?? ''} />}
                {profileTab === "games" && <h1>games</h1>}
                {profileTab === "schedule" && <CreatorSchedule creatorUUID={creatorUUID} />}
                {profileTab === "media" && <h1>media</h1>}
                {profileTab === "reviews" && <h1>reviews</h1>}
                {profileTab === "ScheduleCustomize" && <ScheduleCustomize creatorUUID={creatorUUID} />}
            </div>
        </div>
    );
}