import FullCalendar, { formatDate } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { INITIAL_EVENTS, createEventId } from '../../event-utils'
import ptLocale from '@fullcalendar/core/locales/pt-br'
import './styles.css'

function Home() {
    return (
        <div>
            <header>
                <nav className="navbar bg-primary text-white">
                    <h3>
                     Home
                    </h3>
                </nav>
            </header>
            <body>
                <div className="demo-app">
                    <div className="demo-app-main">
                    <FullCalendar
                        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                        headerToolbar={{
                          left: 'prev,next today',
                          center: 'title',
                          right: 'dayGridMonth,timeGridWeek',
                          
                        }}
                        locales={[ptLocale]}
                        initialView='dayGridMonth'
                        editable={true}
                        selectable={true}
                        selectMirror={true}
                        dayMaxEvents={true}
                        initialEvents={INITIAL_EVENTS}
                        ></FullCalendar>
                    </div>
                </div>
             
            </body>
        </div>
    );
}

export default Home;