"use client"

import { useState } from "react"
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGridPlugin from "@fullcalendar/timegrid"
import interactionPlugin from "@fullcalendar/interaction"

export default function SchedulePage(){
    const [events, setEvents] = useState([
    {
        title: "Design Review",
        date: "2026-02-02",
        color: "#059669"
    },
    {
        title: "Family Trip",
        date: "2026-02-06",
        color: "#7c3aed"
    },
    {
        title: "Meeting With Client",
        date: "2026-02-06",
        color: "#8b5cf6"
    }
    ])

    return (
        <div className="calendar-dark d-flex"> 
            <aside className="sidebar-calendar p-4">
                <button className="btn create-btn w-100 mb-4">
                + Create new Events
                </button>

                <h6 className="text-light">Events</h6>
                <p className="text-secondary small">
                Drag and drop your event or click in the calendar
                </p>

                <div className="event-pill purple">Design</div>
                <div className="event-pill green">Development</div>
                <div className="event-pill red">Testing</div>
                <div className="event-pill yellow">Responsive</div>
            </aside>
            <main className="flex-fill p-4">
                <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                initialDate="2026-02-01"
                headerToolbar={{
                    left: "prev,next today",
                    center: "title",
                    right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek"
                }}
                events={events}
                editable={true}
                selectable={true}
                height="auto"
                />
            </main>
        </div>
    )
}