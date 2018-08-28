import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
// import { Redirect, withRouter } from "react-router";
// import './App.css';

import Dashboard from "./pages/Dashboard";
import MemberSignIn from "./pages/MemberSignIn";
import MemberSignUp from "./pages/MemberSignUp";

const App = () => (
  <Router>
    <div>
        <Switch>
   		   <Route exact path="/signin" component={MemberSignIn} />
   		   <Route exact path="/signup" component={MemberSignUp} />
   		   <Route exact path="/dashboard" component={Dashboard} />
        </Switch> 
    </div>
  </Router>
);

export default App;
