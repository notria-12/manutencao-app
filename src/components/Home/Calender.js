import "./styles.css";
import React, { useEffect, useState } from "react"
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import ptLocale from '@fullcalendar/core/locales/pt-br'
import { useHistory } from 'react-router-dom'
import {db} from '../../firebase'
import {  getMonth, getYear } from "date-fns";


function Calender() {

    const history = useHistory();
    const [events, setEvents] = useState([]);

    

    useEffect(()=> {
      const today = Date.now();
      const year = getYear(today);
      const month = getMonth(today) + 1;

        const unsubscribeActivities = db.collection('scheduled_activities').doc(year.toString()).collection(month.toString()).onSnapshot(snapshot => setEvents(snapshot.docs.map(doc => {  return { "date": year+'-0'+month+'-'+(doc.id < 10 ? "0"+doc.id: doc.id), title: 'Atividades pra este dia'}})));
        console.log('Eventos',events)
        return () => {
            unsubscribeActivities()
        }
         
    }, []);

    const routeChange = (date) => {
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
            // eventClick={getActivies }
            dateClick={routeChange}
            eventContent={renderEventContent}
            events={events}       
            


        ></FullCalendar>
        </div>

    )
}

function renderEventContent(eventInfo) {
    return (
      <>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </>
    )
  }

export default Calender;