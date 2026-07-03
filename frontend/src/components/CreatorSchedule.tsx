import { Calendar } from '@calendarjs/react';
import '@calendarjs/react/style.css';
import { useEffect, useState } from 'react';
import { Schedule, Check } from "@mui/icons-material";
import { useNavigate } from 'react-router-dom';
import profilePhoto from '../assets/default_profile_photo.jpg';

// const getLocalDateString = () => {
//     const now = new Date();
//     const year = now.getFullYear();
//     const month = String(now.getMonth() + 1).padStart(2, '0');
//     const day = String(now.getDate()).padStart(2, '0');
//     return `${year}-${month}-${day}`;
// };

// type TimeSlot = {
//     time: string;
//     duration: string;
// };

// type ActivityItem = {
//     message: string;
//     timeAgo: string;
// };

// type CreatorService = {
//     service_id: string;
//     base_service_id: string;
//     label?: string;
//     session_length_minutes: number | null;
//     cost: number | null;
// };

// type CreatorData = {
//     id: string;
//     name: string;
//     username: string;
//     photoUrl?: string;
//     services?: CreatorService[];
//     availability: Record<string, string>;
//     upcoming: {
//         today: TimeSlot[];
//         tomorrow: TimeSlot[];
//     };
//     recentActivity: ActivityItem[];
// };

// const defaultCreator: CreatorData = {
//     id: 'luna',
//     name: 'Luna',
//     username: '@itsluna',
//     photoUrl: profilePhoto,
//     services: [],
//     availability: {
//         [getLocalDateString()]: '9:00 AM - 10:00 AM',
//     },
//     upcoming: {
//         today: [
//             { time: '7:00 PM', duration: '30 min' },
//             { time: '8:00 PM', duration: '30 min' },
//         ],
//         tomorrow: [
//             { time: '2:00 PM', duration: '1 hr' },
//             { time: '3:00 PM', duration: '30 min' },
//         ],
//     },
//     recentActivity: [
//         { message: 'A user booked a Duo Gaming session.', timeAgo: '2 min ago' },
//         { message: 'Someone from USA booked a Coaching session.', timeAgo: '5 min ago' },
//     ],
// };

export default function CreatorSchedule(props: { creatorUUID: string | null}) {
    const navigate = useNavigate();
    const { creatorUUID } = props;
    const [selectedDate, setSelectedDate] = useState<string | number>(new Date().toISOString().split('T')[0]); // Default to today's date in YYYY-MM-DD format
    const [creatorDetails, setCreatorDetails] = useState<any>(null);

    useEffect(() => {
        let isCancelled = false;

        const loadCreator = async () => {
            try {
                const response = await fetch(new URL('../mocks/seedProfiles.json', import.meta.url).href);
                if (!response.ok) {
                    return;
                }

                const data = await response.json() as any[];
                const creators = Array.isArray(data) ? data : [];
                const resolvedCreator = creators.find((creator) => creator.id === creatorUUID) ?? null;

                if (!isCancelled) {
                    setCreatorDetails({
                        ...resolvedCreator,
                        photoUrl: resolvedCreator?.photoUrl,
                    });
                }
            } catch {
                if (!isCancelled) {
                    setCreatorDetails(null);
                }
            }
        };

        loadCreator();

        return () => {
            isCancelled = true;
        };
    }, [creatorUUID]);

    const goToBooking = () => {
        navigate('/booking', { state: { creator: creatorDetails, creatorId: creatorUUID } });
    };

    if (!creatorDetails) {
        return <div>Loading...</div>;
    }

    // const availability = creatorDetails.availability;
    // const upcomingToday = creatorDetails.upcoming.today;
    // const upcomingTomorrow = creatorDetails.upcoming.tomorrow;
    // const recentActivity = creatorDetails.recentActivity;
    // const selectedDateKey = String(selectedDate);
    return (
        <div className="creator-schedule">
            <div className="schedule-overview">
                <div className="upcoming-schedule">
                    <div className="upcoming-schedule-header">
                        <Schedule fontSize="large" htmlColor="#9557ED" />
                        <div>
                            <h2>Upcoming {creatorDetails.name}</h2>
                            <p>Book a session in the next 24h</p>
                        </div>
                    </div>
                    <div className="upcoming-schedule-contents">
                        <div className="schedule-item">
                            <h3>Today</h3>
                            <div className="schedule-times">
                                {/* {upcomingToday.map((slot : any) => (
                                    <div key={`today-${slot.time}`}>
                                        <p>{slot.time}</p>
                                        <p>{slot.duration}</p>
                                        <button onClick={goToBooking}>Book</button>
                                    </div>
                                ))} */}
                            </div>
                        </div>
                        <div className="schedule-item">
                            <h3>Tomorrow</h3>
                            <div className="schedule-times">
                                {/* {upcomingTomorrow.map((slot : any) => (
                                    <div key={`tomorrow-${slot.time}`}>
                                        <p>{slot.time}</p>
                                        <p>{slot.duration}</p>
                                        <button onClick={goToBooking}>Book</button>
                                    </div>

                                ))} */}
                            </div>
                        </div>
                    </div>
                    <div className="activity-schedule">
                        <div className="activity-schedule-header">
                            <h2>Recent Activity</h2>
                            {/* <p>No past events.</p> */}
                        </div>
                        <div className="activity-schedule-contents">
                            {/* {recentActivity.map((item : any) => (
                                <div className="recent-activity-item" key={`${item.message}-${item.timeAgo}`}>
                                    <Check fontSize="medium" htmlColor="#9557ED" />
                                    <div>
                                        <p>{item.message}</p>
                                        <p>{item.timeAgo}</p>
                                    </div>
                                </div>
                            ))} */}
                        </div>
                        <div className="activity-schedule-footer">
                            <p>Live feed updates automatically</p>
                        </div>
                    </div>
                    {/* <p>No upcoming events.</p> */}
                </div>
                <div className="full-schedule">
                        <Calendar
                            type="inline"
                            value={selectedDate}
                            footer={false}
                            grid={true}
                            wheel={false}
                            onChange={(date) => setSelectedDate(date)}
                        />
                </div>
                <div className="availability-container availability-panel">
                    {/* {availability[selectedDateKey] ? (
                        <div className="availability">
                            <h3>Availability for {selectedDateKey}</h3>
                            <p>{availability[selectedDateKey]}</p>
                        </div>
                    ) : (
                        <p>No availability for {selectedDateKey}.</p>
                    )} */}
                </div>
            </div>
        </div>
    );
}