import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import products from './helpers/products.mock';
import sellerOrders from './helpers/sellerOrders.mock';
import allUsers from './helpers/allUsers.mock';



describe('testes da pagina de login', () => {
  let historyGlobal;

  const TOKEN_CUSTOMER = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjo5LCJuYW1lIjoiQ2xpZW50ZSBaw6kgQmlyaXRhIiwiZW1haWwiOiJ6ZWJpcml0YUBlbWFpbC5jb20iLCJyb2xlIjoiY3VzdG9tZXIifSwiaWF0IjoxNjgxMzI3NTIxLCJleHAiOjE2ODE5MzIzMjF9.5-jg8opGN28n8MrzjFCHKQPsqd3eqQX9_hHNVpqpS8o";
  const TOKEN_SELLER = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoyLCJuYW1lIjoiRnVsYW5hIFBlcmVpcmEiLCJlbWFpbCI6ImZ1bGFuYUBkZWxpdmVyeWFwcC5jb20iLCJyb2xlIjoic2VsbGVyIn0sImlhdCI6MTY4MTMyNzk5NCwiZXhwIjoxNjgxOTMyNzk0fQ.BaHuWKIaXOf-M4DRYAMT_Xr4t6UCsOF8iV95dwsz5U0";
  const TOKEN_ADMIN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxLCJuYW1lIjoiRGVsaXZlcnkgQXBwIEFkbWluIiwiZW1haWwiOiJhZG1AZGVsaXZlcnlhcHAuY29tIiwicm9sZSI6ImFkbWluaXN0cmF0b3IifSwiaWF0IjoxNjgxMjM5MDUyLCJleHAiOjE2ODE4NDM4NTJ9.fB-uigOpqdz_Y3Enzmw_CVVl816ne529XJEBVhh8nAA"

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
      }))
  };

  const fetchLoginSeller = () => {
    jest.spyOn(global, 'fetch')
      .mockImplementationOnce(() => Promise.resolve({
        json: () => Promise.resolve({ token: TOKEN_SELLER }),
      }))
      .mockImplementationOnce(() => Promise.resolve({
        json: () => Promise.resolve(sellerOrders),
      }))
  };

  const fetchLoginAdmin = () => {
    jest.spyOn(global, 'fetch')
      .mockImplementationOnce(() => Promise.resolve({
        json: () => Promise.resolve({ token: TOKEN_ADMIN }),
      }))
      .mockImplementationOnce(() => Promise.resolve({
        json: () => Promise.resolve(allUsers),
      }))
  };

  it('1- verificando se os inputs e o botão funcionan corretamente', () => {
    const EMAIL_INPUT = screen.getByTestId('common_login__input-email');
    const PASSWORD_INPUT = screen.getByTestId('common_login__input-password');
    const BUTTON = screen.getByTestId('common_login__button-login')

    expect(BUTTON.disabled).toBe(true);

    const correctEmail = 'teste@teste.com';
    const incorrectEmail = 'xablau';

    userEvent.type(EMAIL_INPUT, incorrectEmail);
    userEvent.type(PASSWORD_INPUT, '1234567');

    expect(BUTTON.disabled).toBe(true);

    userEvent.type(EMAIL_INPUT, correctEmail);
    userEvent.type(PASSWORD_INPUT, '1234567');

    expect(BUTTON.disabled).toBe(false);
  });

  it('2- verifica se ao fazer login como cliente a rota muda para /customer/products', async () => {
    const EMAIL_INPUT = screen.getByTestId('common_login__input-email');
    const PASSWORD_INPUT = screen.getByTestId('common_login__input-password');
    const BUTTON = screen.getByTestId('common_login__button-login')

    const correctEmail = 'zebirita@email.com';

    fetchLoginCustomer();

    userEvent.type(EMAIL_INPUT, correctEmail);
    userEvent.type(PASSWORD_INPUT, '$#zebirita#$');
    userEvent.click(BUTTON);

    const result = await screen.findByTestId('customer_products__element-navbar-user-full-name');

    expect(historyGlobal.location.pathname).toBe('/customer/products');

  });

  it('3- verifica se ao fazer login como vendedor a rota muda para /seller/orders', async () => {
    const EMAIL_INPUT = screen.getByTestId('common_login__input-email');
    const PASSWORD_INPUT = screen.getByTestId('common_login__input-password');
    const BUTTON = screen.getByTestId('common_login__button-login')

    const correctEmail = 'fulana@deliveryapp.com';

    fetchLoginSeller();

    userEvent.type(EMAIL_INPUT, correctEmail);
    userEvent.type(PASSWORD_INPUT, 'fulana@123');
    userEvent.click(BUTTON);

    const result = await screen.findByTestId('customer_products__element-navbar-user-full-name');

    expect(historyGlobal.location.pathname).toBe('/seller/orders');
  });

  it('4- verifica se ao fazer login como administrador a rota muda para /admin/manage', async () => {
    const EMAIL_INPUT = screen.getByTestId('common_login__input-email');
    const PASSWORD_INPUT = screen.getByTestId('common_login__input-password');
    const BUTTON = screen.getByTestId('common_login__button-login')

    const correctEmail = 'adm@deliveryapp.com';

    fetchLoginAdmin();

    userEvent.type(EMAIL_INPUT, correctEmail);
    userEvent.type(PASSWORD_INPUT, '--adm2@21!!--');
    userEvent.click(BUTTON);

    const result = await screen.findByTestId('customer_products__element-navbar-user-full-name');

    expect(historyGlobal.location.pathname).toBe('/admin/manage');
  });
});

// (1, 'Delivery App Admin', 'adm@deliveryapp.com', 'a4c86edecc5aee06eff8fdeda69e0d04', 'administrator'), -- senha: md5('--adm2@21!!--')
//   (2, 'Fulana Pereira', 'fulana@deliveryapp.com', '3c28d2b0881bf46457a853e0b07531c6', 'seller'), -- senha: md5('fulana@123')
//   (3, 'Cliente Zé Birita', 'zebirita@email.com', '1c37466c159755ce1fa181bd247cb925', 'customer'); -- senha: md5('$#zebirita#$')
