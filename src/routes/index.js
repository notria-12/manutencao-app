import { Route } from "react-router-dom";
import ActivitiesList from "../components/ActivitiesList/ActivitiesList";
import Home from "../components/Home";
import Calender from "../components/Home/Calender";
import Login from "../components/Login";

const routes = [
    {
        path: '/login',
        component: Login
    },
    {
        path: '/home',
        component: Home,
        routes: [
            {
                path: '/home/activities/:date',
                component: ActivitiesList
            },
            {
                path:'/home/calendar',
                component: Calender
            }
        ]
    }
]



export default routes;