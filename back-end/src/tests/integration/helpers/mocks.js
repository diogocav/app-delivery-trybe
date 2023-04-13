const DETAILS_OUTPUT = {
    id: 1,
    userId: 3,
    sellerId: 2,
    totalPrice: 261.58,
    deliveryAddress: 'Rua teste',
    deliveryNumber: 123,
    saleDate: '2023-04-11T22:27:39.000Z',
    status: 'Pendente',
    products: [
      {
        name: 'Skol Lata 250ml',
        price: 2.20,
        SaleProduct: {
          quantity: 6,
        },
      },
      {
        name: 'Antarctica Pilsen 300ml',
        price: 2.49,
        SaleProduct: {
          quantity: 2,
        },
      },
      {
        name: 'Heineken 600ml',
        price: 7.50,
        SaleProduct: {
          quantity: 12,
        },
      },
      {
        name: 'Skol Beats Senses 313ml',
        price: 4.49,
        SaleProduct: {
          quantity: 6,
        },
      },
      {
        name: 'Becks 330ml',
        price: 4.99,
        SaleProduct: {
          quantity: 1,
        },
      },
      {
        name: ' Becks 600ml',
        price: 8.89,
        SaleProduct: {
          quantity: 5,
        },
      },
      {
        name: 'Skol Beats Senses 269ml',
        price: 3.57,
        SaleProduct: {
          quantity: 3,
        },
      },
      {
        name: 'Stella Artois 275ml',
        price: 3.49,
        SaleProduct: {
          quantity: 19,
        },
      },
    ],
  };

  const USER_OUTPUT = {
    id: 2,
    name: 'Fulana Pereira',
    email: 'fulana@deliveryapp.com',
    password: '4c28d2b0881bf46457a853e0b07531c4',
    role: 'seller',
  };

  const USER_OUTPUT_CUSTOMER = {
    id: '3',
    name: 'Cliente Zé Birita',
    email: 'zebirita@email.com',
    password: '1c37466c159755ce1fa181bd247cb925',
    role: 'customer',
  };

  const SALE_OUTPUT = [
    {
      id: 1,
      userId: 3,
      sellerId: 2,
      totalPrice: 261.58,
      deliveryAddress: 'Rua teste',
      deliveryNumber: 123,
      saleDate: '2023-04-11T22:27:39.000Z',
      status: 'Pendente',
    },
    {
     id: 2,
     userId: 3,
     sellerId: 2,
     totalPrice: 261.58,
     deliveryAddress: 'Rua teste',
     deliveryNumber: 123,
     saleDate: '2023-05-11T22:27:39.000Z',
     status: 'Pendente',
   },
  ];

  const NEW_SALE = {
    productsSale: [
      {
        name: 'Skol Lata 250ml',
        price: 2.20,
        id: 1,
        quantity: 6,
      },
      ],
     orderInfo: {
       responsiblePerson: 2,
       adress: 'teste',
       number: '1234',
     },
     userInfo: {
        id: 3,
            name: 'Cliente Zé Birita',
            email: 'zebirita@email.com',
            role: 'customer',
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoiMyIsIm5hbWUiOiJDbGllbnRlIFrDqSBCaXJpdGEiLCJlbWFpbCI6InplYmlyaXRhQGVtYWlsLmNvbSIsInJvbGUiOiJjdXN0b21lciJ9LCJpYXQiOjE2ODA3MjMwNDUsImV4cCI6MTY4MTMyNzg0NX0.5BKHgTmPgSai5CDNS9Dxz2t4ua1fPDhc9eZJyl73SKA',
     },
     totalOrderPrice: '13,20', 
  };

  const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoyLCJuYW1lIjoiRnVsYW5hIFBlcmVpcmEiLCJlbWFpbCI6ImZ1bGFuYUBkZWxpdmVyeWFwcC5jb20iLCJyb2xlIjoic2VsbGVyIn0sImlhdCI6MTY4MTM0MDUxNiwiZXhwIjoxNjgxOTQ1MzE2fQ.oan47nzbHfnSRqj5w0ZIqQcz87XHJbu919M0z8OBT6k';
  const TOKEN_CLIENTE ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjozLCJuYW1lIjoiQ2xpZW50ZSBaw6kgQmlyaXRhIiwiZW1haWwiOiJ6ZWJpcml0YUBlbWFpbC5jb20iLCJyb2xlIjoiY3VzdG9tZXIifSwiaWF0IjoxNjgxMzMyNTU1LCJleHAiOjE2ODE5MzczNTV9.BjmBmdXKNhqrW641ymRQtuZPFuB1YgPGI8AOXFLVMKY';
  
  module.exports = {
    DETAILS_OUTPUT,
    USER_OUTPUT,
    SALE_OUTPUT,
    TOKEN,
    NEW_SALE,
    USER_OUTPUT_CUSTOMER,
    TOKEN_CLIENTE,

  };