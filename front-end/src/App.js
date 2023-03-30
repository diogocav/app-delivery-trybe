import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Provider from './context/Provider';
import Login from './pages/Login';
import Register from './pages/Register';
import Products from './pages/Products';
import './App.css';
import NavBar from './components/NavBar';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Provider>
        <Switch>
          <Route exact path="/login" component={ Login } />
          <Route exact path="/register" component={ Register } />
          <Route exact path="/products" component={ Products } />
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
        </Switch>
      </Provider>
    </div>
  );
}

export default App;
