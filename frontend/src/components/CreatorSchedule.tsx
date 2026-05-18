import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { useState } from 'react';
export default function CreatorSchedule({ isLoggedIn }: { isLoggedIn: boolean }) {
    const [availabilities, setAvailabilities] = useState([
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

    const [bookings, setBookings] = useState([
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
    const [userTimeZone, setUserTimeZone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone);
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
            selectable={true}
            editable={isLoggedIn ? true : false}
            />
        </div>
    );
}