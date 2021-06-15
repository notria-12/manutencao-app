
// import { INITIAL_EVENTS, createEventId } from '../../event-utils'

import './styles.css'
import { Link } from 'react-router-dom'
// import Calender from './Calender'
import { Switch, Route } from "react-router-dom";
// import ActivitiesList from '../ActivitiesList/ActivitiesList';
import logo from '../../assets/images/sabao.png'

function Home({ routes }) {


    console.log(routes)
    return (
        <div>
            <header>
                <nav className="navbar bg-primary text-white d-flex justify-content-between">
                    <div className='p-1'>
                        <img src={logo} height={60}>
                        </img>
                    </div>
                    <div className='p-1 m-2'>
                        <Link><button className='btn btn-light text-primary rounded-circle'><span><i className="fas fa-bell"></i></span></button></Link>
                    </div>
                    {/* <h3>
                        Home
                    </h3> */}
                </nav>
            </header>
            <body>

                <main className="home-main">
                    <div className="sidebar bg-primary">
                        <nav>
                            <ul>
                                <li>
                                    <Link to='/home/calendar'><i class="far fa-calendar-alt"></i> Cronograma</Link>
                                </li>
                                <li>
                                    <Link to='/home/anomalies'><i class="fas fa-tools"></i> Anomalias</Link>
                                </li>
                                <li>
                                    <Link to='/home/register'><i class="fas fa-plus"></i> Cadastros</Link>
                                </li>
                                <li>
                                    <Link to='/login'><i class="fas fa-sign-out-alt"></i> Sair</Link>
                                </li>

                            </ul>
                        </nav>
                    </div>
                    <div className="demo-app">
                        <div className="demo-app-main">
                            <Switch>
                                {
                                    routes.map((route, i) => (
                                        <RouteWithSubRoutes key={i} {...route}></RouteWithSubRoutes>
                                    ))
                                }
                            </Switch>
                        </div>
                    </div>

                </main>


            </body>

        </div>

    );
}

function RouteWithSubRoutes(route) {
    return (
        <Route
            path={route.path}
            render={props => (
                // pass the sub-routes down to keep nesting
                <route.component {...props} routes={route.routes} />
            )}
        />
    );
}

export default Home;