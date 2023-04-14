import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

describe('testes da pagina de login', () => {
  let historyGlobal;
  const correctEmail = 'novocontato@email.com';

  beforeEach(() => {
    window.localStorage.clear();

    const { history } = renderWithRouter(<App />);

    historyGlobal = history;
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  const fetchRegister = () => {
    jest.spyOn(global, 'fetch')
    /*  .mockImplementationOnce(() => Promise.resolve({
        json: () => Promise.resolve({ token: TOKEN_CUSTOMER }),
      })) */
      .mockImplementationOnce(() => Promise.resolve({
        json: () => Promise.resolve({ message: 'account created' }),
      }));
  };

  const fetchRegisterError = () => {
    jest.spyOn(global, 'fetch')
    /*  .mockImplementationOnce(() => Promise.resolve({
        json: () => Promise.resolve({ token: TOKEN_CUSTOMER }),
      })) */
      .mockImplementationOnce(() => Promise.resolve({
        json: () => Promise.resolve({ message: null }),
      }));
  };

  it('1- verificando se os elementos renderizam corretamente', async () => {
    const EMAIL_INPUT = screen.getByTestId('common_login__input-email');
    const PASSWORD_INPUT = screen.getByTestId('common_login__input-password');
    const BUTTON_LOGIN = screen.getByTestId('common_login__button-login');
    // const BUTTON_REGISTER = screen.getAllByTestId('common_login__button-register');

    // const correctEmail = 'novocontato@email.com';

    expect(BUTTON_LOGIN.disabled).toBe(true);
    userEvent.type(EMAIL_INPUT, correctEmail);
    userEvent.type(PASSWORD_INPUT, '$#zedotestea#$');
    expect(BUTTON_LOGIN.disabled).toBe(false);
    // expect(BUTTON_REGISTER).toBeInTheDocument();
  });

  it('2- verifica se ao clicar em register  a rota muda para /register', async () => {
    const EMAIL_INPUT = screen.getByTestId('common_login__input-email');
    const PASSWORD_INPUT = screen.getByTestId('common_login__input-password');
    const BUTTON_LOGIN = screen.getByTestId('common_login__button-login');
    const BUTTON_REGISTER = screen.getByTestId('common_login__button-register');
    // const correctEmail = 'novocontato@email.com';

    fetchRegister();

    expect(BUTTON_LOGIN.disabled).toBe(true);
    userEvent.type(EMAIL_INPUT, correctEmail);
    userEvent.type(PASSWORD_INPUT, '$#zedotestea#$');
    expect(BUTTON_LOGIN.disabled).toBe(false);
    userEvent.click(BUTTON_REGISTER);

    const result = await screen
      .findByTestId('common_register__input-email');
    expect(result).toBeInTheDocument();
    expect(historyGlobal.location.pathname).toBe('/register');
  });

  it(`3- verifica se:
      na rota /register os elementos renderizam corretamente`, async () => {
    const EMAIL_LOGIN = screen.getByTestId('common_login__input-email');
    const PASSWORD_LOGIN = screen.getByTestId('common_login__input-password');
    const BUTTON_LOGIN = screen.getByTestId('common_login__button-login');
    const BUTTON_REGISTER = screen.getByTestId('common_login__button-register');

    fetchRegister();

    expect(BUTTON_LOGIN.disabled).toBe(true);
    userEvent.type(EMAIL_LOGIN, correctEmail);
    userEvent.type(PASSWORD_LOGIN, '$#zedotestea#$');
    expect(BUTTON_LOGIN.disabled).toBe(false);
    userEvent.click(BUTTON_REGISTER);

    const result = await screen
      .findByTestId('common_register__input-email');
    expect(result).toBeInTheDocument();
    expect(historyGlobal.location.pathname).toBe('/register');

    const EMAIL_INPUT = screen.getByTestId('common_register__input-email');
    const PASSWORD_INPUT = screen.getByTestId('common_register__input-password');
    const NAME_INPUT = screen.getByTestId('common_register__input-name');
    const BUTTON_CADASTRAR = screen.getByTestId('common_register__button-register');

    expect(BUTTON_CADASTRAR.disabled).toBe(true);
    userEvent.type(NAME_INPUT, 'Zé do teste123');
    userEvent.type(EMAIL_INPUT, correctEmail);
    userEvent.type(PASSWORD_INPUT, '$#zedotestea#$');
    expect(BUTTON_CADASTRAR.disabled).toBe(false);
  });

  it(`4- verifica se:
  ao clicar em cadastrar a rota muda para /customer/products`, async () => {
    const EMAIL_LOGIN = screen.getByTestId('common_login__input-email');
    const PASSWORD_LOGIN = screen.getByTestId('common_login__input-password');
    const BUTTON_LOGIN = screen.getByTestId('common_login__button-login');
    const BUTTON_REGISTER = screen.getByTestId('common_login__button-register');

    fetchRegister();

    expect(BUTTON_LOGIN.disabled).toBe(true);
    userEvent.type(EMAIL_LOGIN, correctEmail);
    userEvent.type(PASSWORD_LOGIN, '$#zedotestea#$');
    expect(BUTTON_LOGIN.disabled).toBe(false);
    userEvent.click(BUTTON_REGISTER);

    const result = await screen
      .findByTestId('common_register__input-email');
    expect(result).toBeInTheDocument();
    expect(historyGlobal.location.pathname).toBe('/register');

    const EMAIL_INPUT = screen.getByTestId('common_register__input-email');
    const PASSWORD_INPUT = screen.getByTestId('common_register__input-password');
    const NAME_INPUT = screen.getByTestId('common_register__input-name');
    const BUTTON_CADASTRAR = screen.getByTestId('common_register__button-register');

    expect(BUTTON_CADASTRAR.disabled).toBe(true);
    userEvent.type(NAME_INPUT, 'Zé do teste123');
    userEvent.type(EMAIL_INPUT, correctEmail);
    userEvent.type(PASSWORD_INPUT, '$#zedotestea#$');
    expect(BUTTON_CADASTRAR.disabled).toBe(false);
    userEvent.click(BUTTON_CADASTRAR);

    const result2 = await screen
      .findByTestId('customer_products__element-navbar-link-orders');
    expect(historyGlobal.location.pathname).toBe('/customer/products');
  });
  it(`5- verifica se:
  ao clicar em cadastrar a rota muda para /customer/products`, async () => {
    const EMAIL_LOGIN = screen.getByTestId('common_login__input-email');
    const PASSWORD_LOGIN = screen.getByTestId('common_login__input-password');
    const BUTTON_LOGIN = screen.getByTestId('common_login__button-login');
    const BUTTON_REGISTER = screen.getByTestId('common_login__button-register');

    fetchRegisterError();

    expect(BUTTON_LOGIN.disabled).toBe(true);
    userEvent.type(EMAIL_LOGIN, correctEmail);
    userEvent.type(PASSWORD_LOGIN, '$#zedotestea#$');
    expect(BUTTON_LOGIN.disabled).toBe(false);
    userEvent.click(BUTTON_REGISTER);

    const result = await screen
      .findByTestId('common_register__input-email');
    expect(result).toBeInTheDocument();
    expect(historyGlobal.location.pathname).toBe('/register');

    const EMAIL_INPUT = screen.getByTestId('common_register__input-email');
    const PASSWORD_INPUT = screen.getByTestId('common_register__input-password');
    const NAME_INPUT = screen.getByTestId('common_register__input-name');
    const BUTTON_CADASTRAR = screen.getByTestId('common_register__button-register');

    expect(BUTTON_CADASTRAR.disabled).toBe(true);
    userEvent.type(NAME_INPUT, 'Zé do teste123');
    userEvent.type(EMAIL_INPUT, correctEmail);
    userEvent.type(PASSWORD_INPUT, '$#zedotestea#$');
    expect(BUTTON_CADASTRAR.disabled).toBe(false);
    await act(async () => userEvent.click(BUTTON_CADASTRAR));

    expect(screen.getByTestId('common_register__element-invalid_register'))
      .toBeInTheDocument();
  });
});
