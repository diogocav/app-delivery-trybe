const sinon = require('sinon');
const { expect } = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');
const jwt = require('jsonwebtoken');
const app = require('../../api/app');
/* const generateToken = require('../../api/middlewares/generateToken'); */
const { User } = require('../../database/models');
const { OUTPUT, LOGIN_OUTPUT, 
    NEW_USER_OUTPUT, NEW_USER_INPUT } = require('./helpers/admin.mock');

chai.use(chaiHttp);

describe('Teste para a rota /admin', function () {
    beforeEach(function () {
        sinon.stub(jwt, 'verify');
        sinon.stub(User, 'findOne');
        sinon.stub(User, 'create');
        sinon.stub(User, 'findAll');
        sinon.stub(User, 'destroy');
      });

   const postEndpoint = '/admin/new_user';

    afterEach(function () {
      sinon.restore();
    });
    
    it('1- Deve retornar com sucesso os admin ', async function () {
        User.findAll.resolves(OUTPUT);
  
      // Action
      const chaiHttpResponse = await chai
         .request(app)
         .get('/admin/users');
  
      // Assertion
      expect(chaiHttpResponse.status).to.be.equals(200);
      expect(chaiHttpResponse.body).to.be.deep.equal(OUTPUT);
    });
  
    it('2- Deve excluir cliente específico com sucesso', async function () {
        jwt.verify.returns({ data: { email: 'teste01@email.com' } });
      User.findOne
        .onCall(0).resolves(LOGIN_OUTPUT).onCall(1).resolves(OUTPUT[2])
        .onCall(2)
        .resolves(OUTPUT[2]);
      User.destroy.resolves(1);
  
      // Action
      const chaiHttpResponse = await chai
         .request(app)
         .delete('/admin/delete/4')
         .set({ Authorization: 'token válidoo' });
         
      // Assertion
     // expect(chaiHttpResponse.status).to.be.equal(204);
      expect(chaiHttpResponse.body).to.deep.equal({ message: 'Finished' });
    }); 

   it('3- Deve criar novo usuário com sucesso', async function () {
      jwt.verify.returns({ data: { email: 'teste1@email.com' } });
    User.findOne
      .onCall(0).resolves(LOGIN_OUTPUT).onCall(1).resolves(undefined)
      .onCall(2)
      .resolves(undefined);
    User.create.resolves(NEW_USER_OUTPUT);
  
      // Action
      const chaiHttpResponse = await chai
         .request(app)
         .post(postEndpoint)
         .send(NEW_USER_INPUT)
         .set({ Authorization: 'token' });
      // Assertion
      expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'account created' });
    });  
       it(`4- Deve retornar: 
       "Email ou nome já cadastrados" ao tentar criar  usuário já existente`, async function () {
        jwt.verify.returns({ data: { email: 'email@email.com' } });
        User.findOne.resolves(LOGIN_OUTPUT);
        User.create.resolves(OUTPUT[0]);
      
          // Action
          const chaiHttpResponse = await chai
             .request(app)
             .post(postEndpoint)
             .send(OUTPUT[0])
             .set({ Authorization: 'token válido' });
          // Assertion
          expect(chaiHttpResponse.body).to.be.deep
         .equal({ message: 'Email ou nome já cadastrados' });
        });  
        it(`5- Deve retornar: 
        "You dont have acess" ao tentar acesso a cadastro sem ser admin`, async function () {
         jwt.verify.returns({ data: { email: 'email@email.com' } });
         User.findOne
          .onCall(0).resolves(OUTPUT[0]).onCall(1).resolves(undefined)
          .onCall(2)
          .resolves(undefined);
            // User.create.resolves(NEW_USER);  
          
              // Action
              const chaiHttpResponse = await chai
                 .request(app)
                 .post(postEndpoint)
                 .send()
                 .set({ Authorization: 'token válido' });
              // Assertion
              expect(chaiHttpResponse.body).to.be.deep
             .equal({ message: 'You dont have acess' });
            });    
  });