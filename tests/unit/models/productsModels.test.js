const { expect } = require("chai");
const sinon = require("sinon");

const connection = require("../../../src/models/connection");
const productModel = require('../../../src/models/product.model');
const productsMock = require("../../mocks/productMock");

describe('Camada Model (Products)', function () {
  it('Testa o listAll', async function () {
    sinon.stub(connection, 'execute').resolves([productsMock]);
    const products = await productModel.listAll();

    expect(products).to.be.deep.equal(productsMock);
  });

  it('Testa o findById', async function () {
    sinon.stub(connection, 'execute').resolves([[productsMock[0]]]);
    const product = await productModel.findById(42);

    expect(product).to.be.deep.equal(productsMock[0]);
  });

  afterEach(sinon.restore);
});
