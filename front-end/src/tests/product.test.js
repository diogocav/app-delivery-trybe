import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import products from './helpers/products.mock';

describe('testes da pagina de produtos', () => {
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

  const fetchProducts = () => {
    jest.spyOn(global, 'fetch')
      .mockImplementationOnce(() => Promise.resolve({
        json: () => Promise.resolve({ token: TOKEN_CUSTOMER }),
      }))
      .mockImplementationOnce(() => Promise.resolve({
        json: () => Promise.resolve(products),
      }));
  };

  it('1- verificando se os produtos renderizam corretamente', async () => {
    const EMAIL_INPUT = screen.getByTestId('common_login__input-email');
    const PASSWORD_INPUT = screen.getByTestId('common_login__input-password');
    const BUTTON = screen.getByTestId('common_login__button-login');

    const correctEmail = 'zebirita@email.com';

    fetchProducts();

    userEvent.type(EMAIL_INPUT, correctEmail);
    userEvent.type(PASSWORD_INPUT, '$#zebirita#$');
    userEvent.click(BUTTON);

    const result = await screen.findAllByRole('img');

    expect(result).toHaveLength(11);
  });

  it('2- verificando se é possivel adicionar e remover produtos do carrinho', async () => {
    const EMAIL_INPUT = screen.getByTestId('common_login__input-email');
    const PASSWORD_INPUT = screen.getByTestId('common_login__input-password');
    const BUTTON = screen.getByTestId('common_login__button-login');

    const correctEmail = 'zebirita@email.com';

    fetchProducts();

    userEvent.type(EMAIL_INPUT, correctEmail);
    userEvent.type(PASSWORD_INPUT, '$#zebirita#$');
    userEvent.click(BUTTON);

    const buttonsPositive = await screen.findAllByText('+');
    const inputProduct = await screen.findByTestId('customer_products__input-card-quantity-1');

    expect(inputProduct.value).toBe('0');

    userEvent.click(buttonsPositive[0]);
    userEvent.click(buttonsPositive[0]);
    userEvent.click(buttonsPositive[0]);

    expect(inputProduct.value).toBe('3');

    const buttonsNegative = await screen.findAllByText('-');

    const cartLocalStorage = JSON.parse(window.localStorage.getItem('cart'));
    expect(cartLocalStorage[0].quantity).toBe(3);

    userEvent.click(buttonsNegative[0]);
    userEvent.click(buttonsNegative[0]);

    expect(inputProduct.value).toBe('1');

    await screen.findByTestId('customer_products__input-card-quantity-1');

    const cartLocalStorage2 = JSON.parse(window.localStorage.getItem('cart'));
    expect(cartLocalStorage2[0].quantity).toBe(1);
  });
});
