const { expect } = require('chai');
const sinon = require('sinon');

const productService = require('../../../src/services/product.service');
const productController = require('../../../src/controllers/product.controller');
const productsMock = require('../../mocks/productMock');
const errorProductMock = require('../../mocks/errorProductMock');

describe('Camada Controller (Products)', function () {
  it('Testa o getAllProducts', async function () {
    sinon.stub(productService, 'findProducts').resolves(productsMock.products);
    const req = {};
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
  
    await productController.getAllProducts(req, res);
    expect(res.status.calledWith(200)).to.be.true;
    expect(res.json.calledWith(productsMock.products)).to.be.true;
  });

  it('Testa se encontra o produto pelo ID', async function () {
    sinon.stub(productService, 'validateProduct').resolves(productsMock.products[0]);
    const req = {
      params: {
        id: 1
      }
    };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await productController.getProductById(req, res);
    expect(res.status.calledWith(200)).to.be.true;
    expect(res.json.calledWith(productsMock.products[0])).to.be.true;
  });

  it('Será validado que não é possível listar um produto que não existe', async function () {
    sinon.stub(productService, 'validateProduct').resolves({ message: 'Product not found' });
    const req = {
      params: {
        id: 42
      }
    };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await productController.getProductById(req, res);
    expect(res.status.calledWith(404)).to.be.true;
    expect(res.json.calledWith(errorProductMock)).to.be.true;
  });

  it('Testa a registerProduct', async function () {
    sinon.stub(productService, 'registerProduct').resolves({insertId: 1});
    const req = {
      body: {
        name: productsMock.productName
      }
    };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await productController.registerProduct(req, res);
    expect(res.status.calledWith(201)).to.be.true;
    expect(res.json.calledWith({
      id: 1,
      name: productsMock.productName,
    })).to.be.true;
  });

  it('Testa a updateProduct', async function () {
    sinon.stub(productService, 'updateProduct').resolves(undefined);
    const req = {
      params: {
        id: 1
      },
      body: {
        name: productsMock.productName
      }
    };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await productController.updateProduct(req, res);
    expect(res.status.calledWith(200)).to.be.true;
    expect(res.json.calledWith({
      id: 1,
      name: productsMock.productName,
    })).to.be.true;
  });

  it('Testa a updateProduct quando NÃO encontra o produto', async function () {
    sinon.stub(productService, 'updateProduct').resolves(errorProductMock);
    const req = {
      params: {
        id: 42
      },
      body: {
        name: productsMock.productName
      }
    };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await productController.updateProduct(req, res);
    expect(res.status.calledWith(404)).to.be.true;
    expect(res.json.calledWith(errorProductMock)).to.be.true;
  });

  afterEach(sinon.restore);
});
