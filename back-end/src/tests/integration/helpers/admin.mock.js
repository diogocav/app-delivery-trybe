const OUTPUT = [
    {
      id: 2,
      name: 'Fulana Pereira',
      email: 'fulana@deliveryapp.com',
      password: '3c28d2b0881bf46457a853e0b07531c6',
      role: 'seller',
    },
    {
      id: 3,
      name: 'Cliente Zé Birita',
      email: 'zebirita@email.com',
      password: '1c37466c159755ce1fa181bd247cb925',
      role: 'customer',
    },
    {
        id: 4,
        name: 'Cliente Teste Birita',
        email: 'zebiritys@email.com',
        password: '2c37466c159755ce1fa181bd247cb928',
        role: 'customer',
      },
  ];

  const LOGIN_OUTPUT = {
    id: 1,
    name: 'Admin Delivery App',
    email: 'adm@deliveryapp.com',
    password: '5c37466c159755ce1fa181bd247cb929',
    role: 'administrator',
  };

  const NOT_ADMIN = {
    id: 7,
    name: 'Joaquina not admin',
    email: 'jojo@deliveryappyy.com',
    password: '8c37466c159755ce1fa181bd247cb929',
    role: 'seller',
  };

  const NEW_USER_INPUT = {
    name: 'Joana do teste',
        email: 'joana@testing.com',
        password: '1234testando',
        role: 'customer',
  };

  const NEW_USER_OUTPUT = {
        id: 6,
        name: 'Joana do teste',
        email: 'joana@testing.com',
        password: '1234testando',
        role: 'customer',
      };
 
module.exports = {
    OUTPUT,
    LOGIN_OUTPUT,
    NEW_USER_INPUT,
    NEW_USER_OUTPUT,
    NOT_ADMIN,
};