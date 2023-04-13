import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import products from './helpers/products.mock';
import sellers from './helpers/sellers.mock';
import selectEvent from 'react-select-event'
import sale from './helpers/sale.mock';

describe('testes da pagina de checkout', () => {
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
      }));
  };

  it('1- verifica se redireciona para aa pagina /customer/checkout', async () => {
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
    userEvent.click(buttonCheckout);

    await screen.findByTestId('customer_checkout__element-order-table-name-0');

    expect(historyGlobal.location.pathname).toBe('/customer/checkout');
  });

  it('2- verifica se renderiza o itens do carrinho corretamente', async () => {
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

    const firstItemName = await screen.findByTestId('customer_checkout__element-order-table-name-0');
    const firstItemQuantity = screen.getByTestId('customer_checkout__element-order-table-quantity-0');
    const secondItemName = screen.getByTestId('customer_checkout__element-order-table-name-1');
    const secondItemQuantity = screen.getByTestId('customer_checkout__element-order-table-quantity-1');
    const thirdItemName = screen.getByTestId('customer_checkout__element-order-table-name-2');
    const thirdItemQuantity = screen.getByTestId('customer_checkout__element-order-table-quantity-2');

    expect(firstItemName.innerHTML).toBe('Skol Lata 250ml');
    expect(firstItemQuantity.innerHTML).toBe('3');
    expect(secondItemName.innerHTML).toBe('Antarctica Pilsen 300ml');
    expect(secondItemQuantity.innerHTML).toBe('2');
    expect(thirdItemName.innerHTML).toBe('Skol Beats Senses 313ml');
    expect(thirdItemQuantity.innerHTML).toBe('1');   
  });

  it('3- verifica se é possivel remover itens do carrinho', async () => {
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

    const firstItemName = await screen.findByTestId('customer_checkout__element-order-table-name-0');
    const firstItemQuantity = screen.getByTestId('customer_checkout__element-order-table-quantity-0');
    const secondItemName = screen.getByTestId('customer_checkout__element-order-table-name-1');
    const secondItemQuantity = screen.getByTestId('customer_checkout__element-order-table-quantity-1');
    const thirdItemName = screen.getByTestId('customer_checkout__element-order-table-name-2');
    const thirdItemQuantity = screen.getByTestId('customer_checkout__element-order-table-quantity-2');

    expect(firstItemName.innerHTML).toBe('Skol Lata 250ml');
    expect(firstItemQuantity.innerHTML).toBe('3');
    expect(secondItemName.innerHTML).toBe('Antarctica Pilsen 300ml');
    expect(secondItemQuantity.innerHTML).toBe('2');
    expect(thirdItemName.innerHTML).toBe('Skol Beats Senses 313ml');
    expect(thirdItemQuantity.innerHTML).toBe('1');
    
    const buttonsRemove = screen.getAllByText('Remover');

    userEvent.click(buttonsRemove[0]);

    expect(firstItemName.innerHTML).toBe('Antarctica Pilsen 300ml');
    expect(firstItemQuantity.innerHTML).toBe('2');
    expect(thirdItemName).not.toBeInTheDocument();
    expect(thirdItemQuantity).not.toBeInTheDocument();
  });

  it('4- verifica se é possivel utilizar o formulario de informações de venda', async () => {
    const EMAIL_INPUT = screen.getByTestId('common_login__input-email');
    const PASSWORD_INPUT = screen.getByTestId('common_login__input-password');
    const BUTTON = screen.getByTestId('common_login__button-login');

    const correctEmail = 'zebirita@email.com';

    fetchCheckout();

    userEvent.type(EMAIL_INPUT, correctEmail);
    // {
    //     "productsSale": [{"id": 1, "name": "Skol Lata 250ml", "quantity": 3, "price": "2,20"},
    //        {"id": 3, "name": "Antarctica Pilsen 300ml", "quantity": 2, "price": "2,49"},
    //        {"id": 6, "name": "Skol Beats Senses 313ml", "quantity": 1, "price": "4,49"}],
    //     "orderInfo": {
    //       "responsiblePerson": "Fulana Pereira",
    //       "adress": "Rua Teste",
    //       "number": "666"
    //     },
    //     "userInfo": {
    //       "id": 3,
    //      "name": "Cliente Zé Birita",
    //      "email": "zebirita@email.com",
    //      "role": "customer"
    //     }, 
    //     "totalOrderPrice": "16,07"
    //  }
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

    expect(inputAdress.value).toBe('Rua Teste');
    expect(inputAdressNumber.value).toBe('666');
  });

  it('5- verifica se é possivel finalizar uma venda', async () => {
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

    await screen.findByTestId('customer_order_details__element-order-details-label-delivery-status1');

    expect(historyGlobal.location.pathname).toBe('/customer/orders/1');
  });
});
