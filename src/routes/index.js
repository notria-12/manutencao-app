import { Route } from "react-router-dom";
import ActivitiesList from "../components/ActivitiesList/ActivitiesList";
import Home from "../components/Home";
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
                path: '/home/activies:id',
                component: ActivitiesList
            }
        ]
    }
]



export default routes;