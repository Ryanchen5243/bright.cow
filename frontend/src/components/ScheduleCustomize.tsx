import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useState, useEffect } from "react";
export default function ScheduleCustomize(props: { creatorUUID: string | null}) {
    const [events, setEvents] = useState<any[]>([]);

    // drag-select → create availability block
    function handleSelect(info:any) {
        const newEvent = {
        id: crypto.randomUUID(),
        start: info.startStr,
        end: info.endStr,
        };

        setEvents((prev) => [...prev, newEvent]);
    }

    // click event → delete block
    function handleDelete(clickInfo:any) {
        const id = clickInfo.event.id;
        setEvents((prev) => prev.filter((e) => e.id !== id));
    }
    useEffect(() => {
        // Load events from localStorage on component mount
        console.log(events);
    }, [events]);

    return (
        <div className="schedule-customize-container">
            <h1>Schedule Customize (to go in settings?)</h1>
            <div className="calendar-wrapper">
                <FullCalendar
                    plugins={[timeGridPlugin, interactionPlugin]}
                    initialView="timeGridWeek"
                    selectable={true}
                    selectMirror={false}
                    allDaySlot={false}
                    events={events}
                    select={handleSelect}
                    eventClick={handleDelete}
                    height="100vh"
                />
                <div>
                    <h2>Current Availability Blocks</h2>
                    <ul>
                        {events.map((event) => (
                            <li key={event.id}>
                                {event.start} - {event.end}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}