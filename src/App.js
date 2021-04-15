
import { BrowserRouter, Switch, Route } from "react-router-dom";
import routes from "./routes/index";
// import Routes from './Routes';

function App() {
  return (
    <BrowserRouter>
       <Switch>
         {
           routes.map((route, i) =>(
             <RouteWithSubRoutes key={i} {...route}></RouteWithSubRoutes>
           ))
         }
       </Switch>
    </BrowserRouter>
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
export default App;
