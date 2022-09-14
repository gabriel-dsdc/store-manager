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

  afterEach(sinon.restore);
});