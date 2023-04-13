import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import products from './helpers/products.mock';
import sellerOrders from './helpers/sellerOrders.mock';
import allUsers from './helpers/allUsers.mock';
import selectEvent from 'react-select-event'

describe('testes da pagina de login', () => {
  let historyGlobal;

  const TOKEN_ADMIN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxLCJuYW1lIjoiRGVsaXZlcnkgQXBwIEFkbWluIiwiZW1haWwiOiJhZG1AZGVsaXZlcnlhcHAuY29tIiwicm9sZSI6ImFkbWluaXN0cmF0b3IifSwiaWF0IjoxNjgxMjM5MDUyLCJleHAiOjE2ODE4NDM4NTJ9.fB-uigOpqdz_Y3Enzmw_CVVl816ne529XJEBVhh8nAA"

  beforeEach(() => {
    window.localStorage.clear();

    const { history } = renderWithRouter(<App />);

    historyGlobal = history;
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });


  const fetchLoginAdmin = () => {
    jest.spyOn(global, 'fetch')
      .mockImplementationOnce(() => Promise.resolve({
        json: () => Promise.resolve({ token: TOKEN_ADMIN }),
      }))
      .mockImplementationOnce(() => Promise.resolve({
        json: () => Promise.resolve(allUsers),
      }))
      .mockImplementationOnce(() => Promise.resolve({
        json: () => Promise.resolve(allUsers),
      }))
      .mockImplementationOnce(() => Promise.resolve({
        json: () => Promise.resolve({ message: 'success' }),
      }));
  };

  it('1- verifica se todos os elementos da pagina de administrador estao na tela', async () => {
    const EMAIL_INPUT = screen.getByTestId('common_login__input-email');
    const PASSWORD_INPUT = screen.getByTestId('common_login__input-password');
    const BUTTON = screen.getByTestId('common_login__button-login')

    const correctEmail = 'adm@deliveryapp.com';

    fetchLoginAdmin();

    userEvent.type(EMAIL_INPUT, correctEmail);
    userEvent.type(PASSWORD_INPUT, '--adm2@21!!--');
    userEvent.click(BUTTON);

    const navBarAdminTitle = await screen.findByTestId('customer_products__element-navbar-link-orders');
    const adminName = await screen.findByTestId('customer_products__element-navbar-user-full-name');
    const logout = await screen.findByTestId('customer_products__element-navbar-link-logout');
    const userName = await screen.findByTestId('admin_manage__input-name');
    const userEmail = screen.getByTestId('admin_manage__input-email');
    const userPassword = screen.getByTestId('admin_manage__input-password');
    const userRole = screen.getByTestId('admin_manage__select-role');
    const users = screen.getAllByRole('row');

    expect(navBarAdminTitle).toBeInTheDocument();
    expect(adminName).toBeInTheDocument();
    expect(logout).toBeInTheDocument();
    expect(userName).toBeInTheDocument();
    expect(userEmail).toBeInTheDocument();
    expect(userPassword).toBeInTheDocument();
    expect(userRole).toBeInTheDocument();
    expect(users.length).toBe(3);
  });

  it('2- verifica se todos os elementos da pagina de administrador estao na tela', async () => {
    const EMAIL_INPUT = screen.getByTestId('common_login__input-email');
    const PASSWORD_INPUT = screen.getByTestId('common_login__input-password');
    const BUTTON = screen.getByTestId('common_login__button-login')

    const correctEmail = 'adm@deliveryapp.com';

    fetchLoginAdmin();

    userEvent.type(EMAIL_INPUT, correctEmail);
    userEvent.type(PASSWORD_INPUT, '--adm2@21!!--');
    userEvent.click(BUTTON);

    const navBarAdminTitle = await screen.findByTestId('customer_products__element-navbar-link-orders');
    const adminName = await screen.findByTestId('customer_products__element-navbar-user-full-name');
    const logout = screen.getAllByRole('button');
    const userName = await screen.findByTestId('admin_manage__input-name');
    const userEmail = screen.getByTestId('admin_manage__input-email');
    const userPassword = screen.getByTestId('admin_manage__input-password');
    const userRole = screen.getByTestId('admin_manage__select-role');
    const users = screen.getAllByRole('row');

    userEvent.click(logout[0]);
  });

  it('3- verifica se é possível adicionar novo usuário com sucesso', async () => {
    const EMAIL_INPUT = screen.getByTestId('common_login__input-email');
    const PASSWORD_INPUT = screen.getByTestId('common_login__input-password');
    const BUTTON = screen.getByTestId('common_login__button-login')

    const correctEmail = 'adm@deliveryapp.com';

    fetchLoginAdmin();

    userEvent.type(EMAIL_INPUT, correctEmail);
    userEvent.type(PASSWORD_INPUT, '--adm2@21!!--');
    userEvent.click(BUTTON);

    const userName = await screen.findByTestId('admin_manage__input-name');
    const userEmail = screen.getByTestId('admin_manage__input-email');
    const userPassword = screen.getByTestId('admin_manage__input-password');
    const userRole = screen.getByTestId('admin_manage__select-role');
    const registerButton = screen.getByTestId('admin_manage__button-register');

    expect(registerButton.disabled).toBe(true);

    userEvent.type(userName, 'Teste testado');
    userEvent.type(userEmail, 'teste@teste.com');
    userEvent.type(userPassword, '1234567');
    selectEvent.select(userRole, 'customer');

    expect(registerButton.disabled).toBe(false);

    userEvent.click(registerButton);

    await screen.findByTestId('admin_manage__input-name');
  });

  it('4- verifica se é possível remover um usuário com sucesso', async () => {
    const EMAIL_INPUT = screen.getByTestId('common_login__input-email');
    const PASSWORD_INPUT = screen.getByTestId('common_login__input-password');
    const BUTTON = screen.getByTestId('common_login__button-login')

    const correctEmail = 'adm@deliveryapp.com';

    fetchLoginAdmin();

    userEvent.type(EMAIL_INPUT, correctEmail);
    userEvent.type(PASSWORD_INPUT, '--adm2@21!!--');
    userEvent.click(BUTTON);

    await screen.findByTestId('admin_manage__input-name');
    const deletButton = await screen.getAllByRole('button');
    
    userEvent.click(deletButton[3]);

    await screen.findByTestId('admin_manage__input-name');
  });
});
