import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import products from './helpers/products.mock';

describe('testes da pagina de login', () => {
  let historyGlobal;

  const TOKEN_CUSTOMER = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjo5LCJuYW1lIjoiQ2xpZW50ZSBaw6kgQmlyaXRhIiwiZW1haWwiOiJ6ZWJpcml0YUBlbWFpbC5jb20iLCJyb2xlIjoiY3VzdG9tZXIifSwiaWF0IjoxNjgxMzI3NTIxLCJleHAiOjE2ODE5MzIzMjF9.5-jg8opGN28n8MrzjFCHKQPsqd3eqQX9_hHNVpqpS8o';

  beforeEach(() => {
    window.localStorage.clear();

    const { history } = renderWithRouter(<App />);

    historyGlobal = history;
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  const fetchLoginCustomer = () => {
    jest.spyOn(global, 'fetch')
      .mockImplementationOnce(() => Promise.resolve({
        json: () => Promise.resolve({ token: TOKEN_CUSTOMER }),
      }))
      .mockImplementationOnce(() => Promise.resolve({
        json: () => Promise.resolve(products),
      }));
  };

  it('1- verificando se renderizam os elementos da NavBar corretamente', async () => {
    const EMAIL_INPUT = screen.getByTestId('common_login__input-email');
    const PASSWORD_INPUT = screen.getByTestId('common_login__input-password');
    const BUTTON_LOGIN = screen.getByTestId('common_login__button-login');

    const correctEmail = 'zebirita@email.com';

    fetchLoginCustomer();

    userEvent.type(EMAIL_INPUT, correctEmail);
    userEvent.type(PASSWORD_INPUT, '$#zebirita#$');
    await act(async () => userEvent.click(BUTTON_LOGIN));

    expect(screen.getByTestId('customer_products__element-navbar-link-products'))
      .toBeInTheDocument();
    expect(screen.getByTestId('customer_products__element-navbar-link-orders'))
      .toBeInTheDocument();
    expect(screen.getByTestId('customer_products__element-navbar-link-logout'))
      .toBeInTheDocument();
    expect(screen.getByTestId('customer_products__element-navbar-user-full-name'))
      .toBeInTheDocument();
    expect(historyGlobal.location.pathname).toBe('/customer/products');
  });
});
