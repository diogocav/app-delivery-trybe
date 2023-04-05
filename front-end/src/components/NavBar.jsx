import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Context from '../context/Context';

export default function NavBar() {
  const { userInfo, setUserInfo } = useContext(Context);
  const { name } = userInfo;

  function logOut() {
    localStorage.removeItem('user');
    setUserInfo('');
  }

  return (
    <nav>
      <ul>
        <li
          data-testid="customer_products__element-navbar-link-products"
        >
          <Link to="/customer/products"> Produtos</Link>
        </li>
        <li
          data-testid="customer_products__element-navbar-link-orders"
        >
          <Link to="/customer/orders"> Meus Pedidos</Link>
        </li>
        <li
          data-testid="customer_products__element-navbar-user-full-name"
        >
          {name}
        </li>
        <li>
          <Link
            to="/login"
            data-testid="customer_products__element-navbar-link-logout"
            onClick={ () => logOut() }
          >
            Sair
          </Link>

        </li>
      </ul>
    </nav>
  );
}
