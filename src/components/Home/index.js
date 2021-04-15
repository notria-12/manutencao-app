import FullCalendar, { formatDate } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { INITIAL_EVENTS, createEventId } from '../../event-utils'
import ptLocale from '@fullcalendar/core/locales/pt-br'
import './styles.css'
import { Link } from 'react-router-dom'

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

                <main className="home-main">
                    <div className="sidebar bg-primary">
                        <nav>
                            <ul>
                                <li>
                                    {/* <a href="">Início</a> */}
                                   <Link to='/home'>Início</Link>
                                </li>
                                <li>
                                    
                                   <Link to=''>Sair</Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                    
                    <div className="demo-app">
                        <div className="demo-app-main">
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
                                initialEvents={INITIAL_EVENTS}
                            ></FullCalendar>
                        </div>
                    </div>
                </main>


            </body>

        </div>

    );
}

export default Home;