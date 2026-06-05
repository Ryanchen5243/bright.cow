import { Calendar } from '@calendarjs/react';
import '@calendarjs/react/style.css';
import { useState } from 'react';
import { Schedule, Check } from "@mui/icons-material";

const getLocalDateString = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

export default function CreatorSchedule({ isLoggedIn }: { isLoggedIn: boolean }) {
    const [selectedDate, setSelectedDate] = useState<string | number>(getLocalDateString());
    const [availability] = useState<Record<string, string>>({
        [getLocalDateString()]: '9:00 AM - 10:00 AM',
        '2026-06-04': '2:00 PM - 3:00 PM',
    });
    const selectedDateKey = String(selectedDate);
    return (
        <div className="creator-schedule">
            <div className="schedule-overview">
                <div className="upcoming-schedule">
                    <div className="upcoming-schedule-header">
                        <Schedule fontSize="large" htmlColor="#9557ED" />
                        <div>
                            <h2>Upcoming Availability</h2>
                            <p>Book a session in the next 24h</p>
                        </div>
                    </div>
                    <div className="upcoming-schedule-contents">
                        <div className="schedule-item">
                            <h3>Today</h3>
                            <div className="schedule-times">
                                <div>
                                    <p>7:00 PM</p>
                                    <p>30 min</p>
                                    <button>Book</button>
                                </div>
                                <div>
                                    <p>8:00 PM</p>
                                    <p>30 min</p>
                                    <button>Book</button>
                                </div>
                            </div>
                        </div>
                        <div className="schedule-item">
                            <h3>Tomorrow</h3>
                            <div className="schedule-times">
                                <div>
                                    <p>2:00 PM</p>
                                    <p>1 hr</p>
                                    <button>Book</button>
                                </div>
                                <div>
                                    <p>3:00 PM</p>
                                    <p>30 min</p>
                                    <button>Book</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <p>No upcoming events.</p> */}
                </div>
                <div className="recent-schedule">
                    <div className="recent-schedule-header">
                        <h2>Recent Activity</h2>
                        <p>No past events.</p>
                    </div>
                    <div className="recent-schedule-contents">
                        <div className="recent-activity-item">
                            <Check fontSize="medium" htmlColor="#9557ED" />
                            <div>
                                <p>A user booked a Duo Gaming session.</p>
                                <p>2 min ago</p>
                            </div>
                        </div>
                        <div className="recent-activity-item">
                            <Check fontSize="medium" htmlColor="#9557ED" />
                            <div>
                                <p>Someone from USA booked a Coaching session.</p>
                                <p>5 min ago</p>
                            </div>
                        </div>
                        <div className="recent-activity-item">
                            <Check fontSize="medium" htmlColor="#9557ED" />
                            <div>
                                <p>A user completed a Chill & Talk session.</p>
                                <p>15 min ago</p>
                            </div>
                        </div>
                        <div className="recent-activity-item">
                            <Check fontSize="medium" htmlColor="#9557ED" />
                            <div>
                                <p>A user booked a Custom Session</p>
                                <p>22 min ago</p>
                            </div>
                        </div>
                    </div>
                    <div className="recent-schedule-footer">
                        <p>Live feed updates automatically</p>
                    </div>
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
                    {availability[selectedDateKey] ? (
                        <div className="availability">
                            <h3>Availability for {selectedDateKey}</h3>
                            <p>{availability[selectedDateKey]}</p>
                        </div>
                    ) : (
                        <p>No availability for {selectedDateKey}.</p>
                    )}
                </div>
            </div>
        </div>
    );
}