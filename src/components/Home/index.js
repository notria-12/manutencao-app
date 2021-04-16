
// import { INITIAL_EVENTS, createEventId } from '../../event-utils'

import './styles.css'
import { Link } from 'react-router-dom'
import Calender from './Calender'
import { Switch, Route } from "react-router-dom";
import ActivitiesList from '../ActivitiesList/ActivitiesList';

function Home({ routes }) {


    console.log(routes)
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
                                    <Link to='/home/calendar'>Início</Link>
                                </li>
                                <li>

                                    <Link to='/login'>Sair</Link>
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