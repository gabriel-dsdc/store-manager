const { expect } = require("chai");
const sinon = require("sinon");

const saleService = require("../../../src/services/sale.service");
const saleController = require("../../../src/controllers/sale.controller");
const salesMock = require("../../mocks/saleMock");
const errorProductMock = require("../../mocks/errorProductMock");

describe('Camada Controller (Sales)', function () {
  it('Testa a registerSale', async function () {
    sinon.stub(saleService, 'registerSale').resolves(1);
    const req = {
      body: salesMock.salesProducts
    };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await saleController.registerSale(req, res);
    expect(res.status.calledWith(201)).to.be.true;
    expect(res.json.calledWith({
      id: 1,
      itemsSold: req.body,
    })).to.be.true;
  });

  it('Testa a registerSale quando o produto NÃO é encontrado', async function () {
    sinon.stub(saleService, 'registerSale').resolves(errorProductMock);
    const req = {};
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await saleController.registerSale(req, res);
    expect(res.status.calledWith(404)).to.be.true;
    expect(res.json.calledWith(errorProductMock)).to.be.true;
  });

  it('Testa a getSales', async function () {
    sinon.stub(saleService, 'getSales').resolves(salesMock.allSales);
    const req = {};
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await saleController.getSales(req, res);
    expect(res.status.calledWith(200)).to.be.true;
    expect(res.json.calledWith(salesMock.allSales)).to.be.true;
  });

  it('Testa a getSaleById', async function () {
    sinon.stub(saleService, 'getSaleById').resolves(salesMock.saleById);
    const req = {
      params: {
        id: 1
      }
    };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await saleController.getSaleById(req, res);
    expect(res.status.calledWith(200)).to.be.true;
    expect(res.json.calledWith(salesMock.saleById)).to.be.true;
  });

  it('Testa a getSaleById quando NÃO encontra o sale', async function () {
    sinon.stub(saleService, 'getSaleById').resolves(salesMock.saleNotFound);
    const req = {
      params: {
        id: 42
      }
    };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await saleController.getSaleById(req, res);
    expect(res.status.calledWith(404)).to.be.true;
    expect(res.json.calledWith(salesMock.saleNotFound)).to.be.true;
  });

  afterEach(sinon.restore);
});