import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Provider from './context/Provider';
import Login from './pages/Login';
import Register from './pages/Register';
import './App.css';

function App() {
  return (
    <div className="App">
      <Provider>
        <Switch>
          <Route exact path="/login" component={ Login } />
          <Route exact path="/register" component={ Register } />
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
        </Switch>
      </Provider>
    </div>
  );
}

export default App;
