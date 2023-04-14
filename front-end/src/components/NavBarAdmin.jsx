import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import blackLogo from '../images/logo-birita-preto.png';

export default function NavBarAdmin() {
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
        <h2
          data-testid="customer_products__element-navbar-link-orders"
        >
          Gerenciar Usuários
        </h2>
        <li
          data-testid="customer_products__element-navbar-user-full-name"
        >
          {userInfo?.name}
        </li>
        <li
          className="bg-black h-full flex w-1/6 place-content-center text-white"
        >
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
