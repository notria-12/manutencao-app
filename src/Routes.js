import React  from 'react';
import { Switch, Route } from "react-router-dom";
import Login from './components/Login';
import Home from "./components/Home";

function Routes (){
    return(
        <Switch>
            <Route exact path="/">
                <Login></Login>
            </Route>
            <Route exact path="/home">
                <Home></Home>
            </Route>

        </Switch>
    );
}

export default Routes;