import "./styles.css";
import React from "react"
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import ptLocale from '@fullcalendar/core/locales/pt-br'
import { useHistory } from 'react-router-dom'
import {db} from '../../firebase'
// import { Calendar } from "@fullcalendar/core";

function Calender() {

    const history = useHistory();

    const getActvitiesList = async () => {
        const ref = db.collection('scheduled_activities');
        const today = Date.now()
        const year = today.getYear();
        const month = today.getMonth() +1;
        
        const result =  await ref.doc(year+"-"+month).get()
        console.log(result);
    }

    const routeChange = (date) => {
        // console.log('Date', date)
        let path = `/home/activities/${date.dateStr}`
        history.push(path)
    }

    return (

        <div className="calendar">
            <FullCalendar 
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
                left: '',
                center: 'title',
                right: '',

            }}
            locales={[ptLocale]}
            initialView='dayGridMonth'
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            eventClick={() => { getActvitiesList() }}
            dateClick={routeChange}
            eventContent={renderEventContent}
            events={[{title: 'event 1', date: '2021-07-23'}, {title: 'event 2', date: '2021-07-24'}]}       
            


        ></FullCalendar>
        </div>

    )
}

function renderEventContent(eventInfo) {
    console.log('CHAMOU')

    return (
      <>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </>
    )
  }

export default Calender;