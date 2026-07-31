import bg from '../assets/default_background_img.png';
import pfp from '../assets/default_profile_photo.jpg';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
<<<<<<< HEAD
import axios from 'axios';
import { Adjust, Edit, Group, SportsEsportsOutlined, SmartDisplay, Message, StarBorder, Translate, Public, WatchLater, type SvgIconComponent } from '@mui/icons-material';
=======
import { Adjust, Edit, Group, SportsEsportsOutlined, SmartDisplay, Message, StarBorder, Translate, Public, WatchLater, VideocamOutlined, ForumOutlined, CheckCircle, LockOutlined, ArrowForward, type SvgIconComponent } from '@mui/icons-material';
>>>>>>> main

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

const getLocalDateValue = (date = new Date()) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

const bookingTimes = ['11:00 AM', '1:00 PM', '3:00 PM', '5:00 PM', '7:00 PM'];

const getSessionEndTime = (startTime: string, durationMinutes: number) => {
    const match = /^(\d{1,2}):(\d{2}) (AM|PM)$/.exec(startTime);
    if (!match) return startTime;
    const [, hourText, minuteText, period] = match;
    let hours = Number(hourText) % 12;
    if (period === 'PM') hours += 12;
    const endMinutes = (hours * 60) + Number(minuteText) + durationMinutes;
    const endHour = Math.floor(endMinutes / 60) % 24;
    const displayHour = endHour % 12 || 12;
    const displayPeriod = endHour >= 12 ? 'PM' : 'AM';
    return `${displayHour}:${String(endMinutes % 60).padStart(2, '0')} ${displayPeriod}`;
};

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
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
    const [selectedBookingServiceId, setSelectedBookingServiceId] = useState<string | null>(null);
    const [isStartingCheckout, setIsStartingCheckout] = useState(false);
    const [checkoutError, setCheckoutError] = useState<string | null>(null);
    const [bookingStep, setBookingStep] = useState<1 | 2>(1);
    const [selectedBookingDate, setSelectedBookingDate] = useState(getLocalDateValue);
    const [selectedBookingTime, setSelectedBookingTime] = useState<string | null>(null);
    const [selectedBookingQuantity, setSelectedBookingQuantity] = useState(1);

    const [realdata, setRealdata] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('/allUsers');
            setRealdata(response.data);
        };
        fetchData();
    }, []);

    useEffect(() => {
        console.log("realdata: //");
        console.log(realdata);
        console.log("end real data");
    }, [realdata]);

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
                    setSelectedBookingServiceId(
                        resolvedCreator?.services?.find((service: any) => service.type === 'session' || service.type === 'minute')?.id ?? null,
                    );
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

    useEffect(() => {
        if (!isBookingModalOpen) {
            return;
        }

        const closeOnEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setIsBookingModalOpen(false);
            }
        };

        window.addEventListener('keydown', closeOnEscape);
        return () => window.removeEventListener('keydown', closeOnEscape);
    }, [isBookingModalOpen]);

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

    const startCheckout = async () => {
        if (!creatorUUID || !selectedBookingServiceId || !selectedBookingDate || !selectedBookingTime) {
            setCheckoutError('Please select a service, date, and time before continuing.');
            return;
        }

        setIsStartingCheckout(true);
        setCheckoutError(null);

        try {
            const response = await fetch('/api/checkout/session', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    creatorId: creatorUUID,
                    serviceId: selectedBookingServiceId,
                    bookingDate: selectedBookingDate,
                    bookingTime: selectedBookingTime,
                    quantity: selectedBookingQuantity,
                }),
            });
            const responseBody = await response.text();
            let data: { url?: string; error?: string } = {};

            if (responseBody) {
                try {
                    data = JSON.parse(responseBody) as { url?: string; error?: string };
                } catch {
                    throw new Error('The payment server returned an invalid response. Check that the backend is running on port 5001.');
                }
            }

            if (!response.ok || !data.url) {
                throw new Error(data.error || 'The payment server returned an empty response. Check that the backend is running on port 5001.');
            }

            window.location.assign(data.url);
        } catch (error) {
            setCheckoutError(error instanceof Error ? error.message : 'Unable to start checkout.');
            setIsStartingCheckout(false);
        }
    };

    const bookableServices = creatorProfile?.services?.filter((service: any) => (
        service.type === 'session' || service.type === 'minute'
    )) ?? [];
    const selectedBookingService = bookableServices.find((service: any) => service.id === selectedBookingServiceId);
    const selectedBookingDuration = Number(selectedBookingService?.durationMin ?? 0) * selectedBookingQuantity;
    const selectedBookingTotal = Number(selectedBookingService?.price ?? 0) * selectedBookingQuantity;
    const selectedBookingEndTime = selectedBookingTime ? getSessionEndTime(selectedBookingTime, selectedBookingDuration) : null;
    const bookingDateOptions = Array.from({ length: 7 }, (_, index) => {
        const date = new Date();
        date.setDate(date.getDate() + index);
        return {
            value: getLocalDateValue(date),
            weekday: new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(date),
            day: new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(date),
        };
    });

    const ServiceIcon = ({ service }: { service: any }) => {
        const name = String(service.name).toLowerCase();
        if (name.includes('call')) return <VideocamOutlined />;
        if (name.includes('chat')) return <ForumOutlined />;
        return <SportsEsportsOutlined />;
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
                            <button className="profile-header-cta-book" onClick={() => { setCheckoutError(null); setBookingStep(1); setIsBookingModalOpen(true); }}><h3>Book a Session</h3></button>
                            <button className="profile-header-cta-follow" onClick={() => alert('Message feature coming soon!')}><h3>Message</h3></button>
                        </div>
                    </div>
                </div>
            </div>
            {isBookingModalOpen && (
                <div
                    className="booking-modal-backdrop"
                    onClick={() => setIsBookingModalOpen(false)}
                    role="presentation"
                >
                    <div
                        className="booking-modal"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="booking-modal-title"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <button
                            type="button"
                            className="booking-modal-close"
                            aria-label="Close booking popup"
                            onClick={() => setIsBookingModalOpen(false)}
                        >
                            ×
                        </button>
                        <h2 id="booking-modal-title">Book a Session</h2>
                        <div className="booking-progress" aria-label="Booking progress">
                            <div className={`booking-progress-step${bookingStep === 1 ? ' active' : ''}`}><span>1</span><strong>Service</strong></div>
                            <i aria-hidden="true" />
                            <div className={`booking-progress-step${bookingStep === 2 ? ' active' : ''}`}><span>2</span><strong>Date &amp; Time</strong></div>
                        </div>
                        {bookingStep === 1 && <>
                            <div className="booking-modal-heading">
                                <h3>Select a Service</h3>
                                <p>Choose how you’d like to spend time with {creatorUserDisplayName}.</p>
                            </div>
                            {bookableServices.length ? (
                            <div className="booking-service-options" role="radiogroup" aria-label="Available sessions">
                                {bookableServices.map((service: any) => {
                                    const isSelected = selectedBookingServiceId === service.id;
                                    return (
                                        <button
                                            key={service.id}
                                            type="button"
                                            className={`booking-service-option${isSelected ? ' selected' : ''}`}
                                            role="radio"
                                            aria-checked={isSelected}
                                            onClick={() => { setSelectedBookingServiceId(service.id); setSelectedBookingQuantity(1); }}
                                            disabled={isStartingCheckout}
                                        >
                                            <span className="booking-service-icon"><ServiceIcon service={service} /></span>
                                            <span className="booking-service-copy">
                                                <strong>{service.name}</strong>
                                                <small>{service.description || 'A personalized session with your creator.'}</small>
                                            </span>
                                            <span className="booking-service-price">
                                                <strong>${Number(service.price).toFixed(2)}</strong>
                                                {service.durationMin && <small> / {service.durationMin} min</small>}
                                            </span>
                                            <span className="booking-service-radio" aria-hidden="true">{isSelected && <CheckCircle />}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        ) : (
                            <p className="booking-modal-error">No sessions are currently available.</p>
                        )}
                        </>}
                        {bookingStep === 2 && <>
                            <div className="booking-modal-heading">
                                <h3>Choose a date and time</h3>
                                <p>Select a time that works for you. All times are shown in {creatorProfile?.availability_time_zone || 'the creator’s local time'}.</p>
                            </div>
                            <div className="booking-date-options" role="radiogroup" aria-label="Available dates">
                                {bookingDateOptions.map((date) => (
                                    <button
                                        key={date.value}
                                        type="button"
                                        role="radio"
                                        aria-checked={selectedBookingDate === date.value}
                                        className={`booking-date-option${selectedBookingDate === date.value ? ' selected' : ''}`}
                                        onClick={() => setSelectedBookingDate(date.value)}
                                    >
                                        <span>{date.weekday}</span><strong>{date.day}</strong>
                                    </button>
                                ))}
                            </div>
                            <div className="booking-time-options" role="radiogroup" aria-label="Available times">
                                {bookingTimes.map((time) => (
                                    <button
                                        key={time}
                                        type="button"
                                        role="radio"
                                        aria-checked={selectedBookingTime === time}
                                        className={`booking-time-option${selectedBookingTime === time ? ' selected' : ''}`}
                                        onClick={() => setSelectedBookingTime(time)}
                                    >
                                        {time}
                                    </button>
                                ))}
                            </div>
                        </>}
                        {checkoutError && <p className="booking-modal-error" role="alert">{checkoutError}</p>}
                        {selectedBookingService && (
                            <>
                                <div className="booking-quantity-picker">
                                    <span>Number of sessions</span>
                                    <div>
                                        <button type="button" aria-label="Remove one session" onClick={() => setSelectedBookingQuantity((quantity) => Math.max(1, quantity - 1))} disabled={selectedBookingQuantity === 1}>−</button>
                                        <strong>{selectedBookingQuantity}</strong>
                                        <button type="button" aria-label="Add one session" onClick={() => setSelectedBookingQuantity((quantity) => Math.min(8, quantity + 1))}>+</button>
                                    </div>
                                </div>
                                <div className="booking-selected-summary">
                                    <span>Booking request</span>
                                    <strong>{selectedBookingService.name} · {selectedBookingQuantity} {selectedBookingQuantity === 1 ? 'session' : 'sessions'} · {selectedBookingDuration} min · ${selectedBookingTotal.toFixed(2)}{bookingStep === 2 && selectedBookingTime ? ` · ${selectedBookingDate}, ${selectedBookingTime}–${selectedBookingEndTime}` : ''}</strong>
                                </div>
                            </>
                        )}
                        <div className="booking-modal-actions">
                            <button type="button" className="booking-modal-cancel" onClick={() => setIsBookingModalOpen(false)}>
                                Cancel
                            </button>
                            {bookingStep === 2 && <button type="button" className="booking-modal-cancel" onClick={() => { setCheckoutError(null); setBookingStep(1); }}>
                                Back
                            </button>}
                            {bookingStep === 1 ? <button
                                type="button"
                                className="booking-modal-confirm"
                                onClick={() => setBookingStep(2)}
                                disabled={!selectedBookingServiceId}
                            >
                                Choose date &amp; time <ArrowForward fontSize="small" />
                            </button> : <button
                                type="button"
                                className="booking-modal-confirm"
                                onClick={startCheckout}
                                disabled={!selectedBookingServiceId || !selectedBookingTime || isStartingCheckout}
                            >
                                {isStartingCheckout ? 'Opening Stripe…' : <><LockOutlined fontSize="small" /> Send request &amp; pay <ArrowForward fontSize="small" /></>}
                            </button>}
                        </div>
                        <p className="booking-payment-policy">
                            By proceeding, you agree to Konevo&apos;s <a href="/terms" target="_blank" rel="noreferrer">Terms of Service and Payment Policy</a>. Your booking is not confirmed until the creator accepts your request. If your request is declined, your payment will be refunded to your original payment method.
                        </p>
                        <p className="booking-security-note"><LockOutlined fontSize="small" /> Payments are securely processed by Stripe.</p>
                    </div>
                </div>
            )}
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
