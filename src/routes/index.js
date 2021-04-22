import ActivitiesList from "../components/ActivitiesList/ActivitiesList";
import Anomalies from "../components/Anomalies/Anomalies";
import ChooseInput from "../components/ChooseInput/ChooseInput";
import Home from "../components/Home";
import Calender from "../components/Home/Calender";
import KeepingForm from "../components/KeepingForm/KeepingForm";
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
            },
            {
                path: '/home/anomalies',
                component: Anomalies
            }
        ]
    }, 
    {
        path: '/keeping',
        component: KeepingForm
    },
     {
        path: '/',
        component: ChooseInput
    },
   
]



export default routes;