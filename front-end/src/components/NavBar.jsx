import React from 'react';
import { Link } from 'react-router-dom';

export default function NavBar() {
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
        <li data-testid="customer_products__element-navbar-user-full-name">Nome</li>
        <li
          data-testid="customer_products__element-navbar-link-logout"
        >
          <Link to="/logout">Sair</Link>

        </li>
      </ul>
    </nav>
  );
}
