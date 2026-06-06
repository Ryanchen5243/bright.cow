import { Link, useLocation } from 'react-router-dom';
import defaultProfilePhoto from '../assets/default_profile_photo.jpg';

export default function BookingPage() {
    const location = useLocation();
    const creator = (location.state as { creator?: { name?: string; username?: string; photoUrl?: string } } | null)?.creator;
    const creatorName = creator?.name ?? 'vincent li';
    const creatorUsername = creator?.username ?? '@vincentli';
    const creatorPhotoUrl = creator?.photoUrl ?? defaultProfilePhoto;

    return (
        <div className="booking-page">
            <div className="booking-page-header">
                <Link to="/app?view=profile">Back to creator profile page</Link>
            </div>
            <div className="booking-page-body">
                <div className="booking-form">

                </div>
                <div className="booking-summary">
                    <div className="booking-summary-header">
                        <div className="booking-summary-profile-photo" aria-hidden="true">
                            <img src={creatorPhotoUrl} alt={`${creatorName}'s profile`} />
                        </div>
                        <div className="booking-summary-creator-details">
                            <h3>{creatorName}</h3>
                            <p>4.9 star (128 reviews)</p>
                            <p>fps, valorant, minecraft</p>
                        </div>
                    </div>
                    <div className="booking-summary-body">
                        <h3>Session Summary</h3>
                    </div>
                </div>
            </div>
        </div>
    );
}