import React from 'react';
import { findByTestId, screen, rerender } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import { sale, salePreparing } from './helpers/sale.mock';
import sellerOrders from './helpers/sellerOrders.mock';

describe('testes da pagina de detalhes do pedido do vendedor', () => {
  let historyGlobal;

  const TOKEN_SELLER = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoyLCJuYW1lIjoiRnVsYW5hIFBlcmVpcmEiLCJlbWFpbCI6ImZ1bGFuYUBkZWxpdmVyeWFwcC5jb20iLCJyb2xlIjoic2VsbGVyIn0sImlhdCI6MTY4MTMyNzk5NCwiZXhwIjoxNjgxOTMyNzk0fQ.BaHuWKIaXOf-M4DRYAMT_Xr4t6UCsOF8iV95dwsz5U0";
  
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
        json: () => Promise.resolve({ token: TOKEN_SELLER }),
      }))
      .mockImplementationOnce(() => Promise.resolve({
        json: () => Promise.resolve(sellerOrders),
      }))
      .mockImplementationOnce(() => Promise.resolve({
        json: () => Promise.resolve(sale),
      }))
      .mockImplementationOnce(() => Promise.resolve({
        json: () => Promise.resolve(sale),
      }))
      .mockImplementationOnce(() => Promise.resolve({
        json: () => Promise.resolve(sale),
      }))
      .mockImplementationOnce(() => Promise.resolve({
        json: () => Promise.resolve({ token: TOKEN_SELLER }),
      }))
      .mockImplementationOnce(() => Promise.resolve({
        json: () => Promise.resolve(sellerOrders),
      }))
      .mockImplementationOnce(() => Promise.resolve({
        json: () => Promise.resolve(sale),
      }))
      .mockImplementationOnce(() => Promise.resolve({
        json: () => Promise.resolve(salePreparing),
      }))
      .mockImplementationOnce(() => Promise.resolve({
        json: () => Promise.resolve(salePreparing),
      }));
  };

  it('1- verifica se a pagina seller/orders/1 renderiza com todos seus componentes', async () => {
    const EMAIL_INPUT = screen.getByTestId('common_login__input-email');
    const PASSWORD_INPUT = screen.getByTestId('common_login__input-password');
    const BUTTON = screen.getByTestId('common_login__button-login');

    const correctEmail = 'fulana@deliveryapp.com';

    fetchCheckout();

    userEvent.type(EMAIL_INPUT, correctEmail);
    userEvent.type(PASSWORD_INPUT, 'fulana@123');
    userEvent.click(BUTTON);

    const saleIdCard = await screen.findByTestId('seller_orders__element-order-id-1');
    const saleStatusCard = screen.getByTestId('seller_orders__element-delivery-status-1');
    const saleDateCard = screen.getByTestId('seller_orders__element-order-date-1');
    const totalPriceCard = screen.getByTestId('seller_orders__element-card-price-1');
    const cards = screen.getAllByRole('button');

    userEvent.click(cards[1]);

    const saleId = await screen.findByTestId('seller_order_details__element-order-details-label-order-id');
    const date = screen.getByTestId('seller_order_details__element-order-details-label-order-date');
    const status = screen.getByTestId('seller_order_details__element-order-details-label-delivery-status');
    const proparingButton = screen.getByTestId('seller_order_details__button-preparing-check');
    const dispatchButton = screen.getByTestId('seller_order_details__button-dispatch-check');
    const products = screen.getAllByRole('cell');

    expect(historyGlobal.location.pathname).toBe('/seller/orders/1');

    expect(saleId).toBeInTheDocument();
    expect(date).toBeInTheDocument();
    expect(status).toBeInTheDocument();
    expect(proparingButton).toBeInTheDocument();
    expect(dispatchButton).toBeInTheDocument();
    expect(products.length).toBe(15);
    expect(status.innerHTML).toBe('Pendente');
  });

  it('2- verifica se o status do pedido é alterado', async () => {
    const EMAIL_INPUT = screen.getByTestId('common_login__input-email');
    const PASSWORD_INPUT = screen.getByTestId('common_login__input-password');
    const BUTTON = screen.getByTestId('common_login__button-login');

    const correctEmail = 'fulana@deliveryapp.com';

    fetchCheckout();

    userEvent.type(EMAIL_INPUT, correctEmail);
    userEvent.type(PASSWORD_INPUT, 'fulana@123');
    userEvent.click(BUTTON);

    const saleIdCard = await screen.findByTestId('seller_orders__element-order-id-1');
    const saleStatusCard = screen.getByTestId('seller_orders__element-delivery-status-1');
    const saleDateCard = screen.getByTestId('seller_orders__element-order-date-1');
    const totalPriceCard = screen.getByTestId('seller_orders__element-card-price-1');
    const cards = screen.getAllByRole('button');

    userEvent.click(cards[1]);

    const saleId = await screen.findByTestId('seller_order_details__element-order-details-label-order-id');
    const date = screen.getByTestId('seller_order_details__element-order-details-label-order-date');
    const status = screen.getByTestId('seller_order_details__element-order-details-label-delivery-status');
    const preparingButton = screen.getByTestId('seller_order_details__button-preparing-check');
    const dispatchButton = screen.getByTestId('seller_order_details__button-dispatch-check');
    const products = screen.getAllByRole('cell');

    expect(historyGlobal.location.pathname).toBe('/seller/orders/1');

    expect(saleId).toBeInTheDocument();
    expect(date).toBeInTheDocument();
    expect(status).toBeInTheDocument();
    expect(preparingButton).toBeInTheDocument();
    expect(dispatchButton).toBeInTheDocument();
    expect(products.length).toBe(15);
    expect(status.innerHTML).toBe('Pendente');
    
    userEvent.click(preparingButton);

    const logoutButton = await screen.findAllByRole('button');
    userEvent.click(logoutButton[0]);

    // rerender(<App />);
    
    await screen.findByTestId('common_login__input-email');
    const EMAIL_INPUT_AGAIN = await screen.findByTestId('common_login__input-email');
    const PASSWORD_INPUT_AGAIN = screen.getByTestId('common_login__input-password');
    const BUTTON_AGAIN = screen.getAllByRole('button');
    
    userEvent.type(EMAIL_INPUT_AGAIN, correctEmail);
    userEvent.type(PASSWORD_INPUT_AGAIN, 'fulana@123');
    userEvent.click(BUTTON_AGAIN[0]);

    // await screen.findByTestId('customer_products__element-navbar-user-full-name');
    // const cardsAgain = screen.getAllByRole('button');

    // userEvent.click(cardsAgain[1]);

    // const statusAgain = await screen.findByTestId('seller_order_details__element-order-details-label-delivery-status');

    // expect(statusAgain.innerHTML).toBe('Preparando');


    // userEvent.click(dispatchButton);

    // await screen.findByTestId('seller_order_details__element-order-details-label-order-id');

    // expect(status.innerHTML).toBe('Em Trânsito');
  });
});
