const connection = require('./connection');

const registerSale = async () => {
  const [result] = await connection.execute(`INSERT INTO StoreManager.sales
   (date) VALUES (NOW());`);

  return result;
};

const registerSaleProduct = async (salesProducts) => {
  const { insertId } = await registerSale();
  const columns = salesProducts.map(() => ' (?, ?, ?)');
  const values = [];
  Object.values(salesProducts).forEach(({ productId, quantity }) => {
    values.push(insertId, productId, quantity);
  });

  await connection.execute(`INSERT INTO StoreManager.sales_products
   (sale_id, product_id, quantity) VALUES
   ${columns};`, values);

  return insertId;
};

module.exports = {
  registerSale,
  registerSaleProduct,
};
