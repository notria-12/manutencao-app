import "./styles.css";
import React from "react"
import FullCalendar, { formatDate } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import ptLocale from '@fullcalendar/core/locales/pt-br'
import { useHistory } from 'react-router-dom'

function Calender() {

    const history = useHistory();

    const routeChange = (date) => {
        console.log('Date', date)
        let path = `/activities/${date.dateStr}`
        history.push(path)
    }

    return (
        <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
                left: 'prev,next',
                center: 'title',
                right: 'today',

            }}
            locales={[ptLocale]}
            initialView='dayGridMonth'
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            eventClick={() => { console.log('Clicou') }}
            dateClick={routeChange}

        // initialEvents={INITIAL_EVENTS}

        ></FullCalendar>

    )
}

export default Calender;