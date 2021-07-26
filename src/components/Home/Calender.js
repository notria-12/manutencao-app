import "./styles.css";
import React, { useEffect, useState } from "react"
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import ptLocale from '@fullcalendar/core/locales/pt-br'
import { useHistory } from 'react-router-dom'
import {db} from '../../firebase'


function Calender() {

    const history = useHistory();
    const [events, setEvents] = useState([]);

 

    useEffect(()=> {
        const today = Date.now()
        const year = today.getYear();
        const month = today.getMonth() +1;

        const unsubscribeActivities = db.collection('scheduled_activities').doc(year).collection(month).onSnapshot(snapshot => setEvents(snapshot.docs.map(doc => { return {...doc.data(), "date": year+'-'+month+'-'+doc.id, title: 'Atividade'}})));

        return () => {
            unsubscribeActivities()
        }
         
    });

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
            // eventClick={() => { getActvitiesList() }}
            dateClick={routeChange}
            eventContent={renderEventContent}
            events={events}       
            


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