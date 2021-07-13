
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import routes from "./routes/index";
// import Routes from './Routes';

function App() {
  return (
    <AuthProvider>
    <BrowserRouter>
       <Switch>
         {
           routes.map((route, i) =>(
             <RouteWithSubRoutes key={i} {...route}></RouteWithSubRoutes>
           ))
         }
       </Switch>
    </BrowserRouter>
    </AuthProvider>
  );
}

function RouteWithSubRoutes(route) {
  return (
    // route.path.includes("/home") ? 
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
