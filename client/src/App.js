import React from 'react';
import Dashboard from './dashboard';
import Login from './Login';
import Signup from './Signup';
// import test2 from './test2';
import inputdevice from './inputdevice';
import ProtectedRoute from './Components/ProtectedRoute';
import { BrowserRouter as Router, Route, useParams } from 'react-router-dom';

export default function App(){
    return(
      <Router>
            <Route exact path="/" component={Login}/>
            <Route path="/signup" component={Signup}/>
            <ProtectedRoute path="/inputdevice" component={inputdevice}/>
            <ProtectedRoute  path="/dashboard/:username" component={Dashboard}/>
      </Router>
    )
    let username = useParams();
  }