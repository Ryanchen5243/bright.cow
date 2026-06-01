import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField, Typography } from '@mui/material';
export default function CreatorSchedule({ isLoggedIn }: { isLoggedIn: boolean }) {
    const [availabilities] = useState([
        {
            id: "1",
            title: "Available",
            start: "2026-05-17T09:00:00",
            end: "2026-05-17T17:00:00",
            backgroundColor: "#000000"
        },
        {
            id: "2",
            title: "Available",
            start: "2026-05-18T10:00:00",
            end: "2026-05-18T16:00:00",
            backgroundColor: "#000000"
        },
        {
            id: "3",
            title: "Available",
            start: "2026-05-19T09:30:00",
            end: "2026-05-19T15:30:00",
            backgroundColor: "#000000"
        },
        {
            id: "4",
            title: "Available",
            start: "2026-05-20T11:00:00",
            end: "2026-05-20T17:00:00",
            backgroundColor: "#000000"
        },
        {
            id: "5",
            title: "Available",
            start: "2026-05-21T10:00:00",
            end: "2026-05-21T16:00:00",
            backgroundColor: "#000000"
        },
        {
            id: "6",
            title: "Available",
            start: "2026-05-22T09:00:00",
            end: "2026-05-22T15:00:00",
            backgroundColor: "#000000"
        },
        {
            id: "7",
            title: "Available",
            start: "2026-05-23T10:00:00",
            end: "2026-05-23T14:00:00",
            backgroundColor: "#000000"
        },
        {
            id: "8",
            title: "Available",
            start: "2026-05-24T11:00:00",
            end: "2026-05-24T17:00:00",
            backgroundColor: "#000000"
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
    const [isBookingDialogOpen, setIsBookingDialogOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<any>(null);
    const [selectedSlot, setSelectedSlot] = useState<string>("");
    const [message, setMessage] = useState<string>("");

    const selectedDateLabel = selectedEvent
        ? new Date(selectedEvent.start).toLocaleString('en-US', { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' })
        : '';

    const selectedEventSlots = (() => {
        if (!selectedEvent) {
            return [];
        }

        const slots: string[] = [];
        const start = new Date(selectedEvent.start);
        const end = new Date(selectedEvent.end);

        while (start < end) {
            const slotEnd = new Date(start.getTime() + 30 * 60000);
            if (slotEnd > end) {
                break;
            }
            slots.push(`${start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${slotEnd.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`);
            start.setTime(start.getTime() + 30 * 60000);
        }

        return slots;
    })();

    const closeBookingDialog = () => {
        setIsBookingDialogOpen(false);
        setSelectedSlot('');
        setMessage('');
    };

    const confirmBooking = () => {
        alert(`Booking confirmed for ${selectedEvent ? new Date(selectedEvent.start).toLocaleDateString() : ''} ${selectedSlot}! \nMessage: ${message}`);
        closeBookingDialog();
    };

    return (
        <div className="creator-schedule">
            <div className="creator-schedule-shell">
                <div className="creator-schedule-calendar-card">
                    <div className="creator-schedule-legend">
                        <span className="creator-schedule-legend-item available">Available slots</span>
                        <span className="creator-schedule-legend-item booked">Booked sessions</span>
                    </div>
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
                                    setSelectedSlot("");
                                    setMessage("");
                                    setIsBookingDialogOpen(true);
                                }
                            } else {
                                alert('Please log in to book a session!');
                            }
                        }
                    }
                    />
                </div>
            </div>

            <Dialog open={isBookingDialogOpen} onClose={closeBookingDialog} fullWidth maxWidth="sm">
                <DialogTitle>Book Session</DialogTitle>
                <DialogContent>
                    <Stack spacing={2} sx={{ pt: 1 }} className="creator-booking-dialog">
                        <div className="creator-booking-head">
                            <p>Checkout</p>
                            <h2>Reserve your slot</h2>
                        </div>

                        <Typography className="creator-booking-date">{selectedDateLabel}</Typography>

                        <TextField
                            select
                            SelectProps={{ native: true }}
                            value={selectedSlot}
                            onChange={(e) => setSelectedSlot(e.target.value)}
                            inputProps={{ 'aria-label': 'Choose time slot' }}
                            fullWidth
                        >
                            <option value="">Select a time slot</option>
                            {selectedEventSlots.map((slot: string) => (
                                <option key={slot} value={slot}>{slot}</option>
                            ))}
                        </TextField>

                        <TextField
                            label="Message to creator"
                            placeholder="Tell Luna your goals for this session..."
                            multiline
                            minRows={4}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            fullWidth
                        />
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeBookingDialog}>Cancel</Button>
                    <Button variant="contained" onClick={confirmBooking} disabled={!selectedSlot}>Confirm Booking</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}