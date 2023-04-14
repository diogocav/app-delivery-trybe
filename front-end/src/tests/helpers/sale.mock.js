const DATE = '2023-04-12T19:35:10.000Z';
const SKOL = 'Skol Lata 250ml';
const ANTARTICA = 'Antarctica Pilsen 300ml';
const BEATS = 'Skol Beats Senses 313ml';

const sale = {
  id: 1,
  userId: 3,
  sellerId: 2,
  totalPrice: '16.07',
  deliveryAddress: 'Rua Teste',
  deliveryNumber: '666',
  saleDate: DATE,
  status: 'Pendente',
  products: [
    {
      name: SKOL,
      price: '2.20',
      SaleProduct: {
        quantity: 3,
      },
    },
    {
      name: ANTARTICA,
      price: '2,49',
      SaleProduct: {
        quantity: 2,
      },
    },
    {
      name: BEATS,
      price: '4.49',
      SaleProduct: {
        quantity: 1,
      },
    },
  ],
};

const salePreparing = {
  id: 1,
  userId: 3,
  sellerId: 2,
  totalPrice: '16.07',
  deliveryAddress: 'Rua Teste',
  deliveryNumber: '666',
  saleDate: DATE,
  status: 'Preparando',
  products: [
    {
      name: SKOL,
      price: '2.20',
      SaleProduct: {
        quantity: 3,
      },
    },
    {
      name: ANTARTICA,
      price: '2,49',
      SaleProduct: {
        quantity: 2,
      },
    },
    {
      name: BEATS,
      price: '4.49',
      SaleProduct: {
        quantity: 1,
      },
    },
  ],
};

const saleDispatch = {
  id: 1,
  userId: 3,
  sellerId: 2,
  totalPrice: '16.07',
  deliveryAddress: 'Rua Teste',
  deliveryNumber: '666',
  saleDate: DATE,
  status: 'Em Trânsito',
  products: [
    {
      name: SKOL,
      price: '2.20',
      SaleProduct: {
        quantity: 3,
      },
    },
    {
      name: ANTARTICA,
      price: '2,49',
      SaleProduct: {
        quantity: 2,
      },
    },
    {
      name: BEATS,
      price: '4.49',
      SaleProduct: {
        quantity: 1,
      },
    },
  ],
};

const saleArrived = {
  id: 1,
  userId: 3,
  sellerId: 2,
  totalPrice: '16.07',
  deliveryAddress: 'Rua Teste',
  deliveryNumber: '666',
  saleDate: DATE,
  status: 'Entregue',
  products: [
    {
      name: SKOL,
      price: '2.20',
      SaleProduct: {
        quantity: 3,
      },
    },
    {
      name: ANTARTICA,
      price: '2,49',
      SaleProduct: {
        quantity: 2,
      },
    },
    {
      name: BEATS,
      price: '4.49',
      SaleProduct: {
        quantity: 1,
      },
    },
  ],
};

module.exports = {
  sale,
  salePreparing,
  saleDispatch,
  saleArrived,
};

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
