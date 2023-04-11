const sinon = require('sinon');
const { expect } = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');
// const crypto = require('crypto');
const app = require('../../api/app');
const { Product } = require('../../database/models');
const products = require('./mocks/products.mock');

chai.use(chaiHttp);

describe('Teste para a rota /products', function () {
  it('1- Deve ser capaz de buscar todos os produtos', async function () {
    sinon.stub(Product, 'findAll').resolves(products);

    // Action
    const chaiHttpResponse = await chai
       .request(app)
       .get('/products');
    // Assertion
    expect(chaiHttpResponse.status).to.be.equals(201);
    expect(chaiHttpResponse.body).to.be.deep.equal(products);

    sinon.restore();
  });
});