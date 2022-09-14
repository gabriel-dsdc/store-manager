const { expect } = require("chai");
const sinon = require("sinon");

const connection = require("../../../src/models/connection");
const saleModel = require("../../../src/models/sale.model");
const salesMock = require("../../mocks/saleMock");

describe('Camada Model (Sales)', function () {
  it('Testa a registerSale', async function () {
    sinon.stub(connection, 'execute').resolves([{insertId: 1}]);
    const insertObject = await saleModel.registerSale();

    expect(insertObject).to.be.deep.equal({ insertId: 1 });
  });

  it('Testa a registerSaleProduct', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 1 }]);
    const insertId = await saleModel.registerSaleProduct(salesMock.salesProducts);

    expect(insertId).to.be.equal(1);
  });

  afterEach(sinon.restore);
});