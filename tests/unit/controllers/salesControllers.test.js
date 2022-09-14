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

  afterEach(sinon.restore);
});