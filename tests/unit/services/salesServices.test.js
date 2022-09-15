const { expect } = require("chai");
const sinon = require("sinon");

const productModel = require("../../../src/models/product.model");
const saleModel = require("../../../src/models/sale.model");
const saleService = require("../../../src/services/sale.service");
const productsMock = require("../../mocks/productMock");
const errorProductMock = require("../../mocks/errorProductMock");
const salesMock = require("../../mocks/saleMock");

describe('Camada Service (Sales)', function () {
  it('Testa a registerSale', async function () {
    sinon.stub(productModel, 'findById').resolves(productsMock.products[0]);
    sinon.stub(saleModel, 'registerSaleProduct').resolves(1);

    const insertId = await saleService.registerSale(salesMock.salesProducts);
    expect(insertId).to.be.equal(1);
  });

  it('Testa a registerSale quando o produto NÃO é encontrado', async function () {
    sinon.stub(productModel, 'findById').resolves(undefined);

    const errorObject = await saleService.registerSale(salesMock.salesProducts);
    expect(errorObject).to.be.deep.equal(errorProductMock);
  });

  it('Testa a getSales', async function () {
    sinon.stub(saleModel, 'getSales').resolves(salesMock.allSales);
    
    const allSales = await saleService.getSales();
    expect(allSales).to.be.deep.equal(salesMock.allSales);
  });

  it('Testa a getSaleById', async function () {
    sinon.stub(saleModel, 'getSaleById').resolves(salesMock.saleById);

    const saleById = await saleService.getSaleById(1);
    expect(saleById).to.be.equal(salesMock.saleById);
  });

  it('Testa a getSaleById quando NÃO encontra o sale', async function () {
    sinon.stub(saleModel, 'getSaleById').resolves([]);

    const errorObject = await saleService.getSaleById(42);
    expect(errorObject).to.be.deep.equal(salesMock.saleNotFound);
  });

  it('Testa a deleteSale', async function () {
    sinon.stub(saleModel, 'deleteSale').resolves({affectedRows: 1});
    const result = await saleService.deleteSale(1);

    expect(result).to.be.equal(undefined);
  });

  it('Testa se o deleteSale NÃO encontra o produto', async function () {
    sinon.stub(saleModel, 'deleteSale').resolves({affectedRows: 0});
    const errorObject = await saleService.deleteSale(42);

    expect(errorObject).to.be.deep.equal(salesMock.saleNotFound);
  });

  afterEach(sinon.restore);
});