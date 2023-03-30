import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function NavBar() {
  const [name, setName] = useState('');
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('user'));
    setName(userInfo.name);
  }, []);

  return (
    <nav>
      <ul>
        <li
          data-testid="customer_products__element-navbar-link-products"
        >
          <Link to="/products"> Produtos</Link>
        </li>
        <li
          data-testid="customer_products__element-navbar-link-orders"
        >
          <Link to="/orders"> Meus Pedidos</Link>
        </li>
        <li
          data-testid="customer_products__element-navbar-user-full-name"
        >
          {name}
        </li>
        <li
          data-testid="customer_products__element-navbar-link-logout"
        >
          <Link to="/logout" onClick={ () => localStorage.removeItem('user') }>Sair</Link>

        </li>
      </ul>
    </nav>
  );
}
