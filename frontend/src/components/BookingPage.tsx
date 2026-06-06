import { Link, useLocation } from 'react-router-dom';

export default function BookingPage() {
    const location = useLocation();
    const creator = (location.state as { creator?: { name?: string; username?: string } } | null)?.creator;
    const creatorName = creator?.name ?? 'vincent li';
    const creatorUsername = creator?.username ?? '@vincentli';

    return (
        <div className="booking-page">
            <h1>Booking Page</h1>
            <p>This is where users can book sessions with {creatorName}.</p>
            <p>Creator: {creatorUsername}</p>
            <Link to="/app?view=profile">Back to creator profile page</Link>
        </div>
    );
}