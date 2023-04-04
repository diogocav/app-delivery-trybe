import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Provider from './context/Provider';
import Login from './pages/Login';
import Register from './pages/Register';
import Products from './pages/Products';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import './App.css';

function App() {
  return (
    <div className="App">
      <Provider>
        <Switch>
          <Route exact path="/login" component={ Login } />
          <Route exact path="/register" component={ Register } />
          <Route exact path="/customer/products" component={ Products } />
          <Route exact path="/customer/checkout" component={ Checkout } />
          <Route exact path="/customer/orders" component={ Orders } />
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
          <Route path="*" component={ Login } />
        </Switch>
      </Provider>
    </div>
  );
}

export default App;
