import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import FlightSearch from './components/FlightSearch';
import MyBookings from './components/MyBookings';
import Admin from './components/Admin';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login}/>
        <Route path="/signup" component={Signup} />
        <Route path="/search" component={FlightSearch} />
        <Route path="/mybookings" component={MyBookings} />
        <Route path="/admin" component={Admin} />
        <Route path="/" component={Login} />

      </Switch>
    </Router>
  );
}

export default App;
