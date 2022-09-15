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

const getSales = async () => {
  const [result] = await connection.execute(`SELECT
   s.id AS saleId, s.date, sp.product_id AS productId, sp.quantity FROM StoreManager.sales s
INNER JOIN StoreManager.sales_products sp ON sp.sale_id = s.id;`);
  return result;
};

const getSaleById = async (saleId) => {
  const [result] = await connection.execute(`SELECT
   s.date, sp.product_id AS productId, sp.quantity FROM StoreManager.sales s
INNER JOIN StoreManager.sales_products sp ON sp.sale_id = s.id
WHERE s.id = ?;`, [saleId]);
  return result;
};

const deleteSale = async (saleId) => {
  const [result] = await connection.execute(`DELETE FROM StoreManager.sales s
WHERE s.id = ?;`, [saleId]);
  return result;
};

const updateSale = async (saleId, salesProducts) => {
  const columns = salesProducts.map(() => 'WHEN sp.product_id = ? THEN ?');
  const values = [];

  Object.values(salesProducts).forEach(({ productId, quantity }) => {
    values.push(productId, quantity);
  });

  const [result] = await connection.execute(`UPDATE StoreManager.sales_products sp
  SET sp.quantity = (CASE
                       ${columns.join(`\n${' '.repeat(23)}`)}
                       ELSE sp.quantity
                     END)
  WHERE sp.sale_id IN (?);`, [...values, Number(saleId)]);
  return result;
};

module.exports = {
  registerSale,
  registerSaleProduct,
  getSales,
  getSaleById,
  deleteSale,
  updateSale,
};
