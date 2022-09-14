const { expect } = require('chai');
const sinon = require('sinon');

const productModel = require('../../../src/models/product.model');
const productService = require('../../../src/services/product.service');
const productsMock = require('../../mocks/productMock');
const errorProductMock = require('../../mocks/errorProductMock');

describe('Camada Services (Products)', function () {
  it('Testa o findProducts', async function () {
    sinon.stub(productModel, 'listAll').resolves(productsMock.products);
    const products = await productService.findProducts();

    expect(products).to.be.deep.equal(productsMock.products);
  });

  it('Testa se o validateProduct encontra o produto', async function () {
    sinon.stub(productModel, 'findById').resolves(productsMock.products[0]);
    const product = await productService.validateProduct(1);
  
    expect(product).to.be.deep.equal(productsMock.products[0]);
  });

  it('Testa se o validateProduct NÃO encontra o produto', async function () {
    sinon.stub(productModel, 'findById').resolves(undefined);
    const product = await productService.validateProduct(42);

    expect(product).to.be.deep.equal(errorProductMock);
  });

  it('Testa a registerProduct', async function () {
    sinon.stub(productModel, 'registerProduct').resolves({insertId: 1});
    const insertObject = await productService.registerProduct(productsMock.productName);

    expect(insertObject).to.be.deep.equal({ insertId: 1 });
  });

  afterEach(sinon.restore);
});