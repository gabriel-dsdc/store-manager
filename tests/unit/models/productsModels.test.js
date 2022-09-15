const { expect } = require("chai");
const sinon = require("sinon");

const connection = require("../../../src/models/connection");
const productModel = require('../../../src/models/product.model');
const productsMock = require("../../mocks/productMock");

describe('Camada Model (Products)', function () {
  it('Testa o listAll', async function () {
    sinon.stub(connection, 'execute').resolves([productsMock.products]);
    const products = await productModel.listAll();

    expect(products).to.be.deep.equal(productsMock.products);
  });

  it('Testa o findById', async function () {
    sinon.stub(connection, 'execute').resolves([[productsMock.products[0]]]);
    const product = await productModel.findById(42);

    expect(product).to.be.deep.equal(productsMock.products[0]);
  });

  it('Testa o registerProduct', async function () {
    sinon.stub(connection, 'execute').resolves([{insertId: 42}]);
    const insertedProduct = await productModel.registerProduct(productsMock.productName);

    expect(insertedProduct).to.be.deep.equal({insertId: 42});
  });

  it('Testa o updateProduct', async function () {
    sinon.stub(connection, 'execute').resolves([{affectedRows: 1}]);
    const affectedRows = await productModel.updateProduct(1, productsMock.productName);

    expect(affectedRows).to.be.deep.equal({affectedRows: 1});
  });

  afterEach(sinon.restore);
});
