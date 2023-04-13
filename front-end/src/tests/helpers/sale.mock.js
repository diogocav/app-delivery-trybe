const sale = {
  id: 1,
  userId: 3,
  sellerId: 2,
  totalPrice: '16.07',
  deliveryAddress: 'Rua Teste',
  deliveryNumber: '666',
  saleDate: '2023-04-12T19:35:10.000Z',
  status: 'Pendente',
  products: [
    {
      name: 'Skol Lata 250ml',
      price: '2.20',
      SaleProduct: {
        quantity: 3,
      },
    },
    {
      name: 'Antarctica Pilsen 300ml',
      price: '2,49',
      SaleProduct: {
        quantity: 2,
      },
    },
    {
      name: 'Skol Beats Senses 313ml',
      price: '4.49',
      SaleProduct: {
        quantity: 1,
      },
    },
  ],
};

module.exports = sale;

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
