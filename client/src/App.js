import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Dashboard from './pages/Dashboard';
import MemberSignIn from './pages/MemberSignIn';
import MemberSignUp from './pages/MemberSignUp';
import Homepage from './pages/Homepage';
import JobSignUp from './pages/JobSignUp';
import MemberPage from './pages/MemberPage';
import Gallery from './pages/Gallery';
import UpdateInfo from './pages/UpdateInfo';
import RequestSignUp from './pages/RequestSignUp';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Footer from './components/Footer';

// import Favicon from 'react-favicon';

const App = () => (
    <Router>
        <div>
            <Switch>
            	<Route exact path='/' component={Homepage} />
       		   	<Route exact path='/signin' component={MemberSignIn} />
       		   	<Route exact path='/signup/:token' component={MemberSignUp} />
       		   	<Route exact path='/dashboard' component={Dashboard} />
                <Route exact path='/jobsignup/date/:id' component={JobSignUp} />
                <Route exact path='/memberpage' component={MemberPage} />
                <Route exact path='/gallery' component={Gallery} />
                <Route exact path='/updateinfo' component={UpdateInfo} />
                <Route exact path='/requestsignup' component={RequestSignUp} />
                <Route exact path='/forgotpassword' component={ForgotPassword} />
                <Route exact path='/resetpassword/:token' component={ResetPassword} />
            </Switch> 
            <Footer/>
        </div>
    </Router>
);

export default App;
