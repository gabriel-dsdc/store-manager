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

  it('Testa a getSales', async function () {
    sinon.stub(connection, 'execute').resolves([salesMock.allSales]);
    const allSales = await saleModel.getSales();

    expect(allSales).to.be.deep.equal(salesMock.allSales);
  });

  it('Testa a getSaleById', async function () {
    sinon.stub(connection, 'execute').resolves([salesMock.saleById]);
    const saleById = await saleModel.getSaleById(1);

    expect(saleById).to.be.equal(salesMock.saleById);
  });

  it('Testa o deleteSale', async function () {
    sinon.stub(connection, 'execute').resolves([{affectedRows: 1}]);
    const affectedRows = await saleModel.deleteSale(1);

    expect(affectedRows).to.be.deep.equal({affectedRows: 1});
  });

  it('Testa o updateSale', async function () {
    sinon.stub(connection, 'execute').resolves([{affectedRows: 1}]);
    const affectedRows = await saleModel.updateSale(1, salesMock.salesProducts);

    expect(affectedRows).to.be.deep.equal({affectedRows: 1});
  });

  afterEach(sinon.restore);
});