const salesProducts = [
  {
    "productId": 1,
    "quantity": 1
  },
  {
    "productId": 2,
    "quantity": 5
  }
];

const SalesProductsWithoutProductId = [
  {
    "quantity": 1
  },
];

const SalesProductsWithoutQuantity = [
  {
    "productId": 1
  },
];

const SalesProductsProductIdNotFound = [
  {
    "productId": 42,
    "quantity": 1
  },
];

const SalesProductsZeroQuantity = [
  {
    "productId": 1,
    "quantity": 0
  },
];

const allSales = [
  {
    "saleId": 1,
    "date": "2022-09-14T22:49:01.000Z",
    "productId": 1,
    "quantity": 5
  },
  {
    "saleId": 1,
    "date": "2022-09-14T22:49:01.000Z",
    "productId": 2,
    "quantity": 10
  },
  {
    "saleId": 2,
    "date": "2022-09-14T22:49:01.000Z",
    "productId": 3,
    "quantity": 15
  }
];

const saleById = [
  {
    "date": "2022-09-14T22:49:01.000Z",
    "productId": 1,
    "quantity": 5
  },
  {
    "date": "2022-09-14T22:49:01.000Z",
    "productId": 2,
    "quantity": 10
  }
];

const saleNotFound = { "message": "Sale not found" };

module.exports = {
  salesProducts,
  SalesProductsWithoutProductId,
  SalesProductsWithoutQuantity,
  SalesProductsProductIdNotFound,
  SalesProductsZeroQuantity,
  allSales,
  saleById,
  saleNotFound,
};
