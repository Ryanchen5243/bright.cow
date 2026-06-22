import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import defaultProfilePhoto from '../assets/default_profile_photo.jpg';

export default function BookingPage() {
    const location = useLocation();
    const state = (location.state as {
        creator?: { name?: string; username?: string; photoUrl?: string; services?: any[] };
        creatorId?: string;
    } | null);
    const creator = state?.creator;
    const creatorId = state?.creatorId;
    const creatorName = creator?.name ?? 'vincent li';
    const creatorPhotoUrl = creator?.photoUrl ?? defaultProfilePhoto;
    const creatorServices = creator?.services ?? [];
    const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
    const backToProfilePath = creatorId ? `/app/profile/${creatorId}?tab=schedule` : '/app?view=profile&tab=schedule';




    







    const formatServiceCost = (cost: number | null) => {
        if (cost === null) {
            return 'Default pricing';
        }
        return `$${cost}`;
    };

    const formatServiceDuration = (minutes: number | null) => {
        if (minutes === null) {
            return 'Custom duration';
        }
        return `${minutes} min`;
    };

    return (
        <div className="booking-page">
            <div className="booking-page-header">
                <Link to={backToProfilePath}>Back to creator profile page</Link>
            </div>
            <div className="booking-page-body">
                <div className="booking-form">
                    <div className="booking-service-and-schedule-container">
                        <div className="booking-service-selection">
                            <h2>1. Choose a Service</h2>
                            {creatorServices.length > 0 ? (
                                <div className="booking-services-list">
                                    <ul>
                                        {creatorServices.map((service) => (
                                            <div
                                                key={service.service_id}
                                                className={`booking-service-card${selectedServiceId === service.service_id ? ' selected' : ''}`}
                                                onClick={() => setSelectedServiceId(service.service_id)}
                                                role="button"
                                                tabIndex={0}
                                                onKeyDown={(event) => {
                                                    if (event.key === 'Enter' || event.key === ' ') {
                                                        setSelectedServiceId(service.service_id);
                                                    }
                                                }}
                                            >
                                                <li key={service.service_id}>
                                                    <strong>{service.label ?? service.base_service_id}</strong> | {formatServiceDuration(service.session_length_minutes)} | {formatServiceCost(service.cost)}
                                                </li>
                                            </div>
                                        ))}
                                    </ul>
                                </div>
                            ) : (
                                <p>No services are currently listed for this creator.</p>
                            )}
                        </div>
                        <div className="booking-schedule-selection">
                            <h2>Select a date and time</h2>
                            <p>Scheduling functionality coming soon!</p>
                        </div>
                    </div>
                    <button type="submit" className="booking-submit-button">Request Booking</button>
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
                        <p>Service: {selectedServiceId ? creatorServices.find((service) => service.service_id === selectedServiceId)?.label ?? selectedServiceId : 'None selected'}</p>
                        <p>Date & Time: N/A</p>
                        <p>Total Cost: {selectedServiceId ? formatServiceCost(creatorServices.find((service) => service.service_id === selectedServiceId)?.cost ?? null) : 'N/A'}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}