const sinon = require('sinon');
const { expect } = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');
// const crypto = require('crypto');
const app = require('../../api/app');
const { User } = require('../../database/models');

chai.use(chaiHttp);

describe('Teste para a rota /login', function () {
  const REGISTER_INPUT = {
    name: 'Cliente Zé Birita',
    email: 'zebirita@email.com',
    password: '$#zebirita#$',
  };

  const REGISTER_OUTPUT = {
      id: '3',
      name: 'Cliente Zé Birita',
      email: 'zebirita@email.com',
      password: '1c37466c159755ce1fa181bd247cb925',
      role: 'customer',
    };

  beforeEach(function () {
    sinon.stub(User, 'create');
    sinon.stub(User, 'findOne');
  });

  afterEach(function () {
    sinon.restore();
  });
  
  it('1- Deve cadastrar um usuário novo com sucesso', async function () {
    User.create.resolves(REGISTER_OUTPUT);

    // Action
    const chaiHttpResponse = await chai
       .request(app)
       .post('/register')
       .send(REGISTER_INPUT);

    // Assertion
    expect(chaiHttpResponse.status).to.be.equals(201);
    expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'account created' });
  });

  it('2- Deve retornar erro com email inválido', async function () {
    const loginInputPassword = {
        email: 'zebiritaemail.com',
        password: '$#zebirit',
      };

    // Action
    const chaiHttpResponse = await chai
       .request(app)
       .post('/register')
       .send(loginInputPassword);

    // Assertion
    expect(chaiHttpResponse.status).to.be.equals(404);
    expect(chaiHttpResponse.body).to.contains({ message: 'Invalid email or password' });
  });

  it('3- Deve retornar erro com senha inválida', async function () {
    const loginInputPassword = {
        email: 'zebirita@email.com',
        password: '$#z',
      };

    // Action
    const chaiHttpResponse = await chai
       .request(app)
       .post('/register')
       .send(loginInputPassword);

    // Assertion
    expect(chaiHttpResponse.status).to.be.equals(404);
    expect(chaiHttpResponse.body).to.contains({ message: 'Invalid email or password' });
  });

  it('4- Deve retornar erro com email e senha vazios', async function () {
    const loginInputPassword = {
        email: '',
        password: '',
      };

    // Action
    const chaiHttpResponse = await chai
       .request(app)
       .post('/register')
       .send(loginInputPassword);

    // Assertion
    expect(chaiHttpResponse.status).to.be.equals(404);
    expect(chaiHttpResponse.body).to.contains({ message: 'All fields must be filled' });
  });

  it('5- Deve retornar erro com email e nome já existente', async function () {
    User.findOne.resolves(REGISTER_OUTPUT);

    // Action
    const chaiHttpResponse = await chai
       .request(app)
       .post('/register')
       .send(REGISTER_INPUT);

    // Assertion
    expect(chaiHttpResponse.status).to.be.equals(409);
    expect(chaiHttpResponse.body).to.contains({ message: 'Email ou nome já cadastrados' });
  });
});