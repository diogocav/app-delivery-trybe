import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import whiteLogo from '../images/logo-birita-branco.png';

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
    <nav
      className="flex bg-darkYellow h-24 min-h-fit place-content-center
      border-black border-b-[2px] font-medium"
    >
      <ul className="flex justify-between w-full place-items-center text-lg text-white">
        <img className="h-4/5 ml-14" src={ whiteLogo } alt="Logo Trybirita." />
        {
          (userInfo?.role === 'customer')
          && (
            <li>
              <Link
                to="/customer/products"
                data-testid="customer_products__element-navbar-link-products"
              >
                {' '}
                PRODUTOS

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
            MEUS PEDIDOS

          </Link>
        </li>
        <li
          data-testid="customer_products__element-navbar-user-full-name"
        >
          {userInfo?.name.toUpperCase()}
        </li>
        <li
          data-testid="logout"
          className="bg-black h-full flex w-1/6 place-content-center"
        >
          <button
            type="button"
            data-testid="customer_products__element-navbar-link-logout"
            onClick={ () => logOut() }
          >
            SAIR
          </button>

        </li>
      </ul>
    </nav>
  );
}
