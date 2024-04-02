import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './Login';
import Guest from './Guest';
import Admin from './Admin';
import AddBook from './AddBook';
import './global.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/guest" component={Guest} />
        <Route path="/admin" component={Admin} />
        <Route path="/addbook" component={AddBook} />
      </Switch>
    </Router>
  );
}

export default App;