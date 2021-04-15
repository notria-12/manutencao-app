
// import { INITIAL_EVENTS, createEventId } from '../../event-utils'

import './styles.css'
import { Link} from 'react-router-dom'
import Calender from './Calender'
import { Switch, Route } from "react-router-dom";
import ActivitiesList from '../ActivitiesList/ActivitiesList';

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
                            <Switch>
                                <Route path='/home'>
                                    <Calender></Calender>
                                </Route>
                                <Route path='/activities/:date'>
                                    <ActivitiesList></ActivitiesList>
                                </Route>
                                
                            </Switch>
                        </div>
                    </div>                  
                    
                </main>


            </body>

        </div>

    );
}

export default Home;