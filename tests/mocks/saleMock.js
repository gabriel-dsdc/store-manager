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

module.exports = {
  salesProducts,
  SalesProductsWithoutProductId,
  SalesProductsWithoutQuantity,
  SalesProductsProductIdNotFound,
  SalesProductsZeroQuantity,
};
