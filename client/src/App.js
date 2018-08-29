import React from 'react';
// { Component }
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// Link
// import { Redirect, withRouter } from "react-router";
// import './App.css';

import Dashboard from "./pages/Dashboard";
import MemberSignIn from "./pages/MemberSignIn";
import MemberSignUp from "./pages/MemberSignUp";
import Homepage from "./pages/Homepage";

const App = () => (
  <Router>
    <div>
        <Switch>
        	<Route exact path="/" component={Homepage} />
   		   	<Route exact path="/signin" component={MemberSignIn} />
   		   	<Route exact path="/signup" component={MemberSignUp} />
   		   	<Route exact path="/dashboard" component={Dashboard} />
        </Switch> 
    </div>
  </Router>
);

export default App;
