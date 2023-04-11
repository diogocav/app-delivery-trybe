const sinon = require('sinon');
const { expect } = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');
// const crypto = require('crypto');
const app = require('../../api/app');
const generateToken = require('../../api/middlewares/generateToken');
const { User } = require('../../database/models');

chai.use(chaiHttp);

describe('Teste para a rota /login', function () {
  const LOGIN_INPUT = {
    email: 'zebirita@email.com',
    password: '$#zebirita#$',
  };

  const LOGIN_OUTPUT = {
      id: '3',
      name: 'Cliente Zé Birita',
      email: 'zebirita@email.com',
      password: '1c37466c159755ce1fa181bd247cb925',
      role: 'customer',
    };

  const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoiMyIsIm5hbWUiOiJDbGllbnRlIFrDqSBCaXJpdGEiLCJlbWFpbCI6InplYmlyaXRhQGVtYWlsLmNvbSIsInJvbGUiOiJjdXN0b21lciJ9LCJpYXQiOjE2ODA3MjMwNDUsImV4cCI6MTY4MTMyNzg0NX0.5BKHgTmPgSai5CDNS9Dxz2t4ua1fPDhc9eZJyl73SKA';
  
  beforeEach(function () {
    sinon.stub(User, 'findOne');
  });

  afterEach(function () {
    sinon.restore();
  });
  
  it('1- Deve fazer um login com sucesso', async function () {
    sinon.stub(generateToken, 'GenerateNewToken').returns(TOKEN);
    User.findOne.resolves(LOGIN_OUTPUT);

    // Action
    const chaiHttpResponse = await chai
       .request(app)
       .post('/login')
       .send(LOGIN_INPUT);

    // Assertion
    expect(chaiHttpResponse.status).to.be.equals(200);
    expect(chaiHttpResponse.body).to.be.deep.equal({ token: TOKEN });
  });

  it('2- Deve retornar erro com email incorreto', async function () {
    const loginInputEmail = {
        email: 'zeb@email.com',
        password: '$#zebirita#$',
      };

    User.findOne.resolves(null);

    // Action
    const chaiHttpResponse = await chai
       .request(app)
       .post('/login')
       .send(loginInputEmail);

    // Assertion
    expect(chaiHttpResponse.status).to.be.equals(404);
    expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'Invalid email' });
  });

  it('3- Deve retornar erro com senha incorreta', async function () {
    const loginInputPassword = {
        email: 'zebirita@email.com',
        password: '$#zebirit',
      };

    User.findOne.resolves(LOGIN_OUTPUT);

    // Action
    const chaiHttpResponse = await chai
       .request(app)
       .post('/login')
       .send(loginInputPassword);

    // Assertion
    expect(chaiHttpResponse.status).to.be.equals(404);
    expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'Invalid password' });
  });

  it('4- Deve retornar erro com email inválido', async function () {
    const loginInputPassword = {
        email: 'zebiritaemail.com',
        password: '$#zebirit',
      };

    // Action
    const chaiHttpResponse = await chai
       .request(app)
       .post('/login')
       .send(loginInputPassword);

    // Assertion
    expect(chaiHttpResponse.status).to.be.equals(404);
    expect(chaiHttpResponse.body).to.contains({ message: 'Invalid email or password' });
  });

  it('5- Deve retornar erro com senha inválida', async function () {
    const loginInputPassword = {
        email: 'zebirita@email.com',
        password: '$#z',
      };

    // Action
    const chaiHttpResponse = await chai
       .request(app)
       .post('/login')
       .send(loginInputPassword);

    // Assertion
    expect(chaiHttpResponse.status).to.be.equals(404);
    expect(chaiHttpResponse.body).to.contains({ message: 'Invalid email or password' });
  });

  it('6- Deve retornar erro com email e senha vazios', async function () {
    const loginInputPassword = {
        email: '',
        password: '',
      };

    // Action
    const chaiHttpResponse = await chai
       .request(app)
       .post('/login')
       .send(loginInputPassword);

    // Assertion
    expect(chaiHttpResponse.status).to.be.equals(404);
    expect(chaiHttpResponse.body).to.contains({ message: 'All fields must be filled' });
  });
});