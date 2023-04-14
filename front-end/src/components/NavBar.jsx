import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import blackLogo from '../images/logo-birita-preto.png';

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
      <ul className="flex justify-between w-full place-items-center text-lg">
        <img className="h-4/5 ml-14" src={ blackLogo } alt="Logo Trybirita." />
        <li
          data-testid="customer_products__element-navbar-user-full-name"
          className="text-white w-1/5 text-center"
        >
          {userInfo?.name.toUpperCase()}
        </li>
        {
          (userInfo?.role === 'customer')
          && (
            <li
              className="flex h-full w-1/5 place-items-center place-content-center
            hover:bg-lightYellow"
            >
              <Link
                className="flex h-full place-items-center place-content-center"
                to="/customer/products"
                data-testid="customer_products__element-navbar-link-products"
              >
                {' '}
                PRODUTOS

              </Link>
            </li>
          )
        }
        <li
          className="flex h-full w-1/5 place-items-center place-content-center
        hover:bg-lightYellow"
        >
          <Link
            to={ `/${userInfo?.role}/orders` }
            data-testid="customer_products__element-navbar-link-orders"
            className="flex h-full place-items-center place-content-center"
          >
            {' '}
            MEUS PEDIDOS

          </Link>
        </li>
        <li
          data-testid="logout"
          className="bg-black h-full flex w-1/6 place-content-center text-white"
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
