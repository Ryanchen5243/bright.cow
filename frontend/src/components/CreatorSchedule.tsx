import { Calendar } from '@calendarjs/react';
import '@calendarjs/react/style.css';
import { useState } from 'react';

const getLocalDateString = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

export default function CreatorSchedule({ isLoggedIn }: { isLoggedIn: boolean }) {
    const [selectedDate, setSelectedDate] = useState<string | number>(getLocalDateString());

    return (
        <div className="creator-schedule">
            <div className="schedule-overview">
                <div className="upcoming-schedule">
                    <h2>Upcoming Schedule</h2>
                    {/* Placeholder for upcoming schedule items */}
                    <p>No upcoming events.</p>
                </div>
                <div className="recent-schedule">
                    <h2>Past Schedule</h2>
                    {/* Placeholder for past schedule items */}
                    <p>No past events.</p>
                </div>
                <div className="schedule-actions">
                    <button className="add-schedule-btn">Add Schedule</button>
                    <button className="edit-schedule-btn">Edit Schedule</button>
                </div>
            </div>
            <div className="full-schedule">
                <div className="monthly-calendar">
                    <Calendar
                        type="inline"
                        value={selectedDate}
                        footer={false}
                        grid={true}
                        onChange={(date) => setSelectedDate(date)}
                    />
                </div>
                <div className="availability-container">
                    {selectedDate}
                </div>
            </div>
        </div>
    );
}