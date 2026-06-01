import { useEffect, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField, Typography } from '@mui/material';
import { Schedule, useSchedule } from '@calendarjs/react';
import '@calendarjs/react/style.css';

type ScheduleEvent = {
    guid: string;
    title: string;
    date: string;
    start: string;
    end: string;
    color: string;
};

const parseTimeToMinutes = (value: string) => {
    const [hours, minutes] = value.split(':').map(Number);
    return hours * 60 + minutes;
};

const formatMinutesToTime = (totalMinutes: number) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    const time = new Date(2026, 0, 1, hours, minutes);
    return time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

export default function CreatorSchedule({ isLoggedIn }: { isLoggedIn: boolean }) {
    const { ref: scheduleRef, instance: scheduleInstance } = useSchedule();
    const [events] = useState<ScheduleEvent[]>([
        {
            guid: '1',
            title: 'Team Standup',
            date: '2026-06-01',
            start: '09:00',
            end: '14:00',
            color: '#3498db'
        },
        {
            guid: '2',
            title: 'Office Hours',
            date: '2026-06-02',
            start: '10:00',
            end: '12:00',
            color: '#e74c3c'
        },
        {
            guid: '3',
            title: 'Content Creation',
            date: '2026-06-03',
            start: '13:00',
            end: '17:00',
            color: '#2ecc71'
        },
        {
            guid: '4',
            title: 'Project Meeting',
            date: '2026-06-04',
            start: '14:00',
            end: '16:00',
            color: '#f1c40f'
        },
        {
            guid: '5',
            title: 'Client Call',
            date: '2026-06-05',
            start: '15:00',
            end: '16:00',
            color: '#9b59b6'
        }
    ]);

    const [isBookingDialogOpen, setIsBookingDialogOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<ScheduleEvent | null>(null);
    const [selectedSlot, setSelectedSlot] = useState<string>("");
    const [message, setMessage] = useState<string>("");

    const selectedDateLabel = selectedEvent
        ? new Date(`${selectedEvent.date}T00:00:00`).toLocaleString('en-US', { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' })
        : '';

    const selectedEventSlots = (() => {
        if (!selectedEvent) {
            return [];
        }

        const slots: string[] = [];
        const start = parseTimeToMinutes(selectedEvent.start);
        const end = parseTimeToMinutes(selectedEvent.end);

        for (let minute = start; minute < end; minute += 30) {
            const slotEnd = minute + 30;
            if (slotEnd > end) {
                break;
            }
            slots.push(`${formatMinutesToTime(minute)} - ${formatMinutesToTime(slotEnd)}`);
        }

        return slots;
    })();

    const closeBookingDialog = () => {
        setIsBookingDialogOpen(false);
        setSelectedSlot('');
        setMessage('');
    };

    const confirmBooking = () => {
        alert(`Booking confirmed for ${selectedEvent ? new Date(`${selectedEvent.date}T00:00:00`).toLocaleDateString() : ''} ${selectedSlot}! \nMessage: ${message}`);
        closeBookingDialog();
    };

    const openBookingDialogForEvent = (event: ScheduleEvent) => {
        if (!isLoggedIn) {
            alert('Please log in to book a session!');
            return;
        }

        setSelectedEvent(event);
        setSelectedSlot('');
        setMessage('');
        setIsBookingDialogOpen(true);
    };

    useEffect(() => {
        if (!scheduleInstance?.el) {
            return;
        }

        const rootElement = scheduleInstance.el;

        const handleSingleClick = (domEvent: Event) => {
            const target = domEvent.target as HTMLElement | null;
            const eventElement = target?.closest('.lm-schedule-item') as (HTMLElement & { event?: ScheduleEvent }) | null;
            if (!eventElement?.event) {
                return;
            }

            openBookingDialogForEvent(eventElement.event);
        };

        rootElement.addEventListener('click', handleSingleClick);
        return () => {
            rootElement.removeEventListener('click', handleSingleClick);
        };
    }, [scheduleInstance, isLoggedIn]);

    return (
        <div className="creator-schedule">
            <Schedule
                ref={scheduleRef}
                type="week"
                value="2026-06-01"
                data={events}
                grid={30}
                validRange={['08:00', '22:00']}
                style={{
                    width: '100%',
                    maxWidth: '1120px',
                    minHeight: '620px',
                    height: '72vh',
                    margin: '0 auto'
                }}
            />
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