import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import Drawer from 'rc-drawer';
import { useState } from 'react';
import 'rc-drawer/assets/index.css';
export default function CreatorSchedule({ isLoggedIn }: { isLoggedIn: boolean }) {
    const [availabilities] = useState([
        {
            id: "1",
            title: "Available",
            start: "2026-05-17T09:00:00",
            end: "2026-05-17T17:00:00",
            backgroundColor: "#A3D2CA"
        },
        {
            id: "2",
            title: "Available",
            start: "2026-05-18T10:00:00",
            end: "2026-05-18T16:00:00",
            backgroundColor: "#A3D2CA"
        },
        {
            id: "3",
            title: "Available",
            start: "2026-05-19T09:30:00",
            end: "2026-05-19T15:30:00",
            backgroundColor: "#A3D2CA"
        },
        {
            id: "4",
            title: "Available",
            start: "2026-05-20T11:00:00",
            end: "2026-05-20T17:00:00",
            backgroundColor: "#A3D2CA"
        },
        {
            id: "5",
            title: "Available",
            start: "2026-05-21T10:00:00",
            end: "2026-05-21T16:00:00",
            backgroundColor: "#A3D2CA"
        },
        {
            id: "6",
            title: "Available",
            start: "2026-05-22T09:00:00",
            end: "2026-05-22T15:00:00",
            backgroundColor: "#A3D2CA"
        },
        {
            id: "7",
            title: "Available",
            start: "2026-05-23T10:00:00",
            end: "2026-05-23T14:00:00",
            backgroundColor: "#A3D2CA"
        },
        {
            id: "8",
            title: "Available",
            start: "2026-05-24T11:00:00",
            end: "2026-05-24T17:00:00",
            backgroundColor: "#A3D2CA"
        },
    ]);

    const [bookings] = useState([
        {
            id: "1",
            title: "Booking A",
            start: "2026-05-17T09:00:00",
            end: "2026-05-17T10:00:00",
            backgroundColor: "#FF6961"
        },
        {
            id: "2",
            title: "Booking B",
            start: "2026-05-17T13:30:00",
            end: "2026-05-17T14:30:00",
            backgroundColor: "#FF6961"
        },
        {
            id: "3",
            title: "Booking C",
            start: "2026-05-18T10:00:00",
            end: "2026-05-18T11:30:00",
            backgroundColor: "#FF6961"
        },
        {
            id: "4",
            title: "Booking D",
            start: "2026-05-19T09:30:00",
            end: "2026-05-19T10:15:00",
            backgroundColor: "#FF6961"
        },
        {
            id: "5",
            title: "Booking E",
            start: "2026-05-20T14:00:00",
            end: "2026-05-20T15:00:00",
            backgroundColor: "#FF6961"
        },
        {
            id: "6",
            title: "Booking F",
            start: "2026-05-21T11:00:00",
            end: "2026-05-21T12:00:00",
            backgroundColor: "#FF6961"
        },
        {
            id: "7",
            title: "Booking G",
            start: "2026-05-22T16:00:00",
            end: "2026-05-22T17:30:00",
            backgroundColor: "#FF6961"
        },
        {
            id: "8",
            title: "Booking H",
            start: "2026-05-23T10:00:00",
            end: "2026-05-23T11:00:00",
            backgroundColor: "#FF6961"
        },
        {
            id: "9",
            title: "Booking I",
            start: "2026-05-24T11:00:00",
            end: "2026-05-24T12:00:00",
            backgroundColor: "#FF6961"
        },
    ]);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<any>(null);
    const [selectedSlot, setSelectedSlot] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    return (
        <div className="creator-schedule">
            <FullCalendar
            plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin ]}
            initialView="timeGridWeek"
            height="auto"
            contentHeight="auto"
            headerToolbar={{
                start: "title",
                center: "",
                end: "today prev,next"            }}
            stickyHeaderDates={true}
            slotLabelFormat={{
                hour: "numeric",
                minute: "2-digit",
                omitZeroMinute: false,
                meridiem: "short",
                hour12: true
            }}
            timeZone="local"
            eventSources={[{ events: bookings }, { events: availabilities }]}
            eventClick={
                (info) => {
                    if (isLoggedIn) {
                        if (info.event.title === "Available") {
                            setSelectedEvent(info.event);
                            setIsDrawerOpen(true);
                        }
                    } else {
                        alert('Please log in to book a session!');
                    }
                }
            }
            />
            <Drawer
                placement="right"
                onClose={() => setIsDrawerOpen(false)}
                open={isDrawerOpen}
                width="600px">
                <div className="booking-drawer">
                    <h1 className="h1-style">Booking Details</h1>
                    <span>{selectedEvent ? 
                        new Date(selectedEvent.start).toLocaleString('en-US', { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' }) : ""}</span>
                    <div className="time-slots">
                        {selectedEvent && (() => {
                            const slots = [];
                            const start = new Date(selectedEvent.start);
                            const end = new Date(selectedEvent.end);
                            while (start < end) {
                                const slotEnd = new Date(start.getTime() + 30 * 60000);
                                if (slotEnd > end) break;
                                slots.push(`${start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${slotEnd.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`);
                                start.setTime(start.getTime() + 30 * 60000);
                            }
                            return <select className='selected-time-slot' value={selectedSlot} onChange={(e) => setSelectedSlot(e.target.value)}>
                                    {slots.map((slot: string, index: number) => (
                                        <option key={index} value={slot}>{slot}</option>
                                    ))}
                                </select>;
                        })()}
                    </div>
                    <textarea placeholder="Message to creator..." className="booking-message" value={message} onChange={(e) => setMessage(e.target.value)} />
                    <button onClick={() => alert(`Booking confirmed for ${selectedEvent ? new Date(selectedEvent.start).toLocaleDateString() : ""} ${selectedSlot}! \nMessage: ${message}`)}>Confirm Booking</button>
                </div>
            </Drawer>
        </div>
    );
}