import React from 'react';
import Dashboard from './dashboard';
import Login from './Login';
import Signup from './Signup';
import ProtectedRoute from './Components/ProtectedRoute';
import { BrowserRouter as Router, Route } from 'react-router-dom';

export default function App(){
    return(
      <Router>
            <Route path="/login" component={Login}/>
            <Route path="/signup" component={Signup}/>
            <ProtectedRoute  path="/dashboard" component={Dashboard}/>
      </Router>
    )
  }