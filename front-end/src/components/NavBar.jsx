import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

export default function NavBar() {
  const [userInfo, setUserInfo] = useState();
  const history = useHistory();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('user')) || '';
    setUserInfo(data);
  }, []);

  function logOut() {
    localStorage.removeItem('user');
    setUserInfo('');
    history.push('/login');
  }

  return (
    <nav>
      <ul>
        {
          (userInfo?.role === 'customer')
          && (
            <li>
              <Link
                to="/customer/products"
                data-testid="customer_products__element-navbar-link-products"
              >
                {' '}
                Produtos

              </Link>
            </li>
          )
        }
        <li>
          <Link
            to={ `/${userInfo?.role}/orders` }
            data-testid="customer_products__element-navbar-link-orders"
          >
            {' '}
            Meus Pedidos

          </Link>
        </li>
        <li
          data-testid="customer_products__element-navbar-user-full-name"
        >
          {userInfo?.name}
        </li>
        <li data-testid="logout">
          <button
            type="button"
            data-testid="customer_products__element-navbar-link-logout"
            onClick={ () => logOut() }
          >
            Sair
          </button>

        </li>
      </ul>
    </nav>
  );
}
