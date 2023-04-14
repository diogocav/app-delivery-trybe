const sinon = require('sinon');
const { expect } = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../api/app');
const { User } = require('../../database/models');

chai.use(chaiHttp);

describe('Teste para a rota /users', function () {
    const USER_OUTPUT = [
        {
          id: 2,
          name: 'Testando Pereira',
          email: 'testando@deliveryapp.com',
          password: '4c28d2b0881bf46457a853e0b07531c4',
          role: 'seller',
        },
      ];
  
    afterEach(function () {
      sinon.restore();
    });
    
    it('1- Deve retornar com sucesso os vendedores ', async function () {
      sinon.stub(User, 'findAll').resolves(USER_OUTPUT);
  
      // Action
      const chaiHttpResponse = await chai
         .request(app)
         .get('/users/seller');
  
      // Assertion
      expect(chaiHttpResponse.status).to.be.equals(200);
      expect(chaiHttpResponse.body).to.be.deep.equal(USER_OUTPUT);
    });
  
    it('2- Deve retornar vendedor procurado por id', async function () {
      sinon.stub(User, 'findOne').resolves(USER_OUTPUT[0]);
  
      // Action
      const chaiHttpResponse = await chai
         .request(app)
         .get('/users/seller/2');
      // Assertion
      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.deep.equal(USER_OUTPUT[0]);
    });

    it('3- Deve retornar erro com id incorreto', async function () {
       sinon.stub(User, 'findOne').resolves(null);
  
      // Action
      const chaiHttpResponse = await chai
         .request(app)
         .get('/seller/5');
  
      // Assertion
      expect(chaiHttpResponse.body).to.be.deep.equal({});
    });
  });