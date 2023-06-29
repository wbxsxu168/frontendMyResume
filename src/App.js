import './App.css';
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//import { HashRouter as Router, Switch, Route } from "react-router-dom";

import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import LoginComponent from "./pages/LoginComponent";
import { PrivateRoute } from "./utils/PrivateRoute";
import HomeComponent from "./pages/HomeComponent";
import FileDownLdComponent from "./pages/FileDownLdComponent";
import LogoutComponent from "./pages/LogoutComponent";
import CConfig from "./utils/CConfig";
 
function App() {
  return (
    <div className="App">
    <Router basename={process.env.PUBLIC_URL}>
      <Switch>
        <Route exact path="/" component={LoginComponent}></Route>
        <Route exact path={CConfig.logoutPageUrl} component={LogoutComponent}></Route>
        <PrivateRoute exact path="/home" component={HomeComponent}></PrivateRoute>   
        <PrivateRoute exact path="/dwnldfile/:idx" component={FileDownLdComponent}></PrivateRoute>    
      </Switch>
    </Router>
    </div>
  );
}
export default App;

