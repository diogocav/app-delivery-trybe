const sinon = require('sinon');
const { expect } = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../api/app');
const generateToken = require('../../api/middlewares/generateToken');
const { Sale, User } = require('../../database/models');
const { DETAILS_OUTPUT, USER_OUTPUT, SALE_OUTPUT,
    TOKEN, NEW_SALE, USER_OUTPUT_CUSTOMER, TOKEN_CLIENTE } = require('./helpers/mocks');

chai.use(chaiHttp);

describe('Teste para a rota /sale', function () {
beforeEach(function () {
   sinon.stub(generateToken, 'GenerateNewToken').returns(TOKEN);
   sinon.stub(User, 'findOne');
   sinon.stub(Sale, 'create');
   sinon.stub(Sale, 'findOne');
   sinon.stub(Sale, 'findAll');
   sinon.stub(Sale, 'update');
 });

    afterEach(function () {
      sinon.restore();
    });
    
    it('1- Deve retornar com sucesso as vendas de um vendedor', async function () {
      User.findOne.resolves(USER_OUTPUT);
      Sale.findAll.resolves(SALE_OUTPUT);
    
      // Action
      const chaiHttpResponse = await chai
         .request(app)
         .get('/sale/2')
         .set({ Authorization: TOKEN });
  
      // Assertion
     expect(chaiHttpResponse.status).to.be.equals(200); 
     expect(chaiHttpResponse.body).to.be.deep.equal(SALE_OUTPUT);
    });
    it('1.2- Deve retornar com sucesso as vendas de um cliente', async function () {
      User.findOne.resolves(USER_OUTPUT_CUSTOMER);
      Sale.findAll.resolves(SALE_OUTPUT);
    
      // Action
      const chaiHttpResponse = await chai
         .request(app)
         .get('/sale/3')
         .set({ Authorization: TOKEN_CLIENTE });
  
   console.log('SALE', chaiHttpResponse);
      // Assertion
     expect(chaiHttpResponse.status).to.be.equals(200); 
     expect(chaiHttpResponse.body).to.be.deep.equal(SALE_OUTPUT);
    });
  
      it('2- Deve retornar venda procurada por seu id', async function () {
         User.findOne.resolves(USER_OUTPUT);
         Sale.findOne.resolves(DETAILS_OUTPUT);
      // Action
      const chaiHttpResponse = await chai
         .request(app)
         .get('/sale/details/1')
         .set({ Authorization: TOKEN });
      // Assertion
      expect(chaiHttpResponse.status).to.be.equal(200); 
      expect(chaiHttpResponse.body).to.deep.equal(DETAILS_OUTPUT);
    });

     it('3- Deve criar nova venda', async function () {
      User.findOne.resolves(USER_OUTPUT);
      Sale.create.resolves({ dataValues: { id: 2 } });
  
      // Action
      const chaiHttpResponse = await chai
         .request(app)
         .post('/sale')
         .send(NEW_SALE)
         .set({ Authorization: TOKEN });
  
      // Assertion
      expect(chaiHttpResponse.body).to.be.deep.equal({ id: 2 });
    }); 
     it('4- Deve fazer update do status de uma venda', async function () {
      User.findOne.resolves(USER_OUTPUT);
      Sale.update.resolves([1]);
 
     // Action
     const chaiHttpResponse = await chai
        .request(app)
        .patch('/sale/1')
        .send({ status: 'Preparando' })
        .set({ Authorization: TOKEN });
 
     // Assertion
        expect(chaiHttpResponse.status).to.be.equals(200);
     // expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'Finished' });
   }); 
   it('5- Deve fazer update do status de uma venda', async function () {
      User.findOne.resolves(USER_OUTPUT);
      Sale.update.resolves([0]);
 
     // Action
     const chaiHttpResponse = await chai
        .request(app)
        .patch('/sale/1')
        .set({ Authorization: TOKEN })
        .send({ status: '' });
 
     // Assertion
     // expect(chaiHttpResponse.status).to.be.equals(200);
     expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'Unable to perform task' });
   });
    it('6- Deve retornar erro quando não há token do user', async function () {
      User.findOne.resolves(USER_OUTPUT);
      Sale.findAll.resolves(SALE_OUTPUT);
   
       // Action
       const chaiHttpResponse = await chai
          .request(app)
          .get('/sale/3')
          .set({ Authorization: '' });
       // Assertion
       expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'Token not found' });
     });  
     it('7- Deve retornar erro quando token do user está incorreto', async function () {
      User.findOne.resolves(USER_OUTPUT);
      Sale.findAll.resolves(SALE_OUTPUT);
   
       // Action
       const chaiHttpResponse = await chai
          .request(app)
          .get('/sale/3')
          .set({ Authorization: '1234' });
       // Assertion
       expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'Token must be a valid token' });
     });  
  });
