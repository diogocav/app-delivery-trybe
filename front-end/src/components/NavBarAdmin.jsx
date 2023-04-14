import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

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
    <nav>
      <h2
        data-testid="customer_products__element-navbar-link-orders"
      >
        Gerenciar Usuários
      </h2>
      <ul>
        <li
          data-testid="customer_products__element-navbar-user-full-name"
        >
          {userInfo?.name}
        </li>
        <li>
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
