import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Provider from './context/Provider';
import Login from './pages/Login';
import Register from './pages/Register';
import Products from './pages/Products';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import Admin from './pages/Admin';
import OrdersDetail from './pages/OrdersDetail';

function App() {
  return (
    <div className="bg-white w-full h-screen">
      <Provider>
        <Switch>
          <Route exact path="/login" component={ Login } />
          <Route exact path="/register" component={ Register } />
          <Route exact path="/customer/products" component={ Products } />
          <Route exact path="/customer/checkout" component={ Checkout } />
          <Route exact path="/customer/orders" component={ Orders } />
          <Route exact path="/customer/orders/:id" component={ OrdersDetail } />
          <Route exact path="/seller/orders" component={ Orders } />
          <Route exact path="/seller/orders/:id" component={ OrdersDetail } />
          <Route exact path="/admin/manage" component={ Admin } />
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
