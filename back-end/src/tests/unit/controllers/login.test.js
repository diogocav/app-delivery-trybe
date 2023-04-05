// const Sinon = require('sinon');
// const { expect } = require('chai');
// const loginService = require('../../../src/services/LoginService');
// const loginController = require('../../../src/controllers/LoginController');

// describe('Teste para a rota /login na camada controller', function () {
//   it('Deve buscar um email no banco com sucesso', async function () {
//     const emailTest = 'teste@teste.com'
//     const loginOutput = [
//       {
//         id: '4',
//         name: 'Teste',
//         email: 'teste@teste.com',
//         password: '1c37466c159755ce1fa181bd247cb925',
//         role: 'customer',
//       },
//     ];
//     Sinon.stub(Model, 'findOne').resolves(loginOutput);
//     // Action
//     const result = await loginService.loginCheck(emailTest);

//     // Assertion
//     expect(result).to.be.deep.equal(loginOutput);
//     Sinon.restore(); 
//   });

// });