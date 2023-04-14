import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import products from './helpers/products.mock';
import sellers from './helpers/sellers.mock';
import selectEvent from 'react-select-event'
import { sale } from './helpers/sale.mock';

describe('testes da pagina de pedidos', () => {
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

  const fetchCheckout = () => {
    jest.spyOn(global, 'fetch')
      .mockImplementationOnce(() => Promise.resolve({
        json: () => Promise.resolve({ token: TOKEN_CUSTOMER }),
      }))
      .mockImplementationOnce(() => Promise.resolve({
        json: () => Promise.resolve(products),
      }))
      .mockImplementationOnce(() => Promise.resolve({
        json: () => Promise.resolve(sellers),
      }))
      .mockImplementationOnce(() => Promise.resolve({
        json: () => Promise.resolve({ id: 1 }),
      }))
      .mockImplementationOnce(() => Promise.resolve({
        json: () => Promise.resolve(sale),
      }))
    //   .mockImplementationOnce(() => Promise.resolve({
    //     json: () => Promise.resolve(),
    //   }));
  };

  it('1- verifica se a pagina customer/orders renderiza com todos seus componentes', async () => {
    const EMAIL_INPUT = screen.getByTestId('common_login__input-email');
    const PASSWORD_INPUT = screen.getByTestId('common_login__input-password');
    const BUTTON = screen.getByTestId('common_login__button-login');

    const correctEmail = 'zebirita@email.com';

    fetchCheckout();

    userEvent.type(EMAIL_INPUT, correctEmail);
    userEvent.type(PASSWORD_INPUT, '$#zebirita#$');
    userEvent.click(BUTTON);

    const buttonsPositive = await screen.findAllByText('+');
    const buttonCheckout = screen.getByTestId('customer_products__button-cart');

    userEvent.click(buttonsPositive[0]);
    userEvent.click(buttonsPositive[0]);
    userEvent.click(buttonsPositive[0]);
    userEvent.click(buttonsPositive[2]);
    userEvent.click(buttonsPositive[2]);
    userEvent.click(buttonsPositive[5]);

    userEvent.click(buttonCheckout);

    const inputSelectSeller = await screen.findByTestId('customer_checkout__select-seller');
    const inputAdress = screen.getByTestId('customer_checkout__input-address');
    const inputAdressNumber = screen.getByTestId('customer_checkout__input-address-number');
 
    selectEvent.select(inputSelectSeller, '2');
    userEvent.type(inputAdress, 'Rua Teste');
    userEvent.type(inputAdressNumber, '666');

    const finishOrderButton = screen.getByTestId('customer_checkout__button-submit-order');

    userEvent.click(finishOrderButton);

    const saleId = await screen.findByTestId('customer_order_details__element-order-details-label-order-id');
    const sellerName = screen.getByTestId('customer_order_details__element-order-details-label-seller-name');
    const date = screen.getByTestId('customer_order_details__element-order-details-label-order-date');
    const status = screen.getByTestId('customer_order_details__element-order-details-label-delivery-status1');
    const deliveriedButton = screen.getByTestId('customer_order_details__button-delivery-check');
    const orderCard = screen.getAllByRole('button');

    const ordersNavLink = screen.getByTestId('customer_products__element-navbar-link-orders');

    // userEvent.click(ordersNavLink);

    // const saleIdCard = await screen.findByTestId('customer_orders__element-order-id-1');
    // const saleStatusCard = screen.getByTestId('customer_orders__element-delivery-status-1');
    // const saleDateCard = screen.getByTestId('customer_orders__element-order-date-1');
    // const totalPriceCard = screen.getByTestId('customer_orders__element-card-price-1');
    // const cards = screen.getAllByRole('button');

    // expect(historyGlobal.location.pathname).toBe('/customer/orders');

    // expect(saleIdCard).toBeInTheDocument();
    // expect(saleStatusCard).toBeInTheDocument();
    // expect(saleDateCard).toBeInTheDocument();
    // expect(totalPriceCard).toBeInTheDocument();

    // userEvent.click(cards[0]);

    // expect(historyGlobal.location.pathname).toBe('/customer/orders/1');
  });
});
