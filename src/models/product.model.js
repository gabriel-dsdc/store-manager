const connection = require('./connection');

const listAll = async () => {
  const [result] = await connection.execute(`SELECT * FROM StoreManager.products p
ORDER BY p.id;`);
  return result;
};

const findById = async (productId) => {
  const [[result]] = await connection.execute(`SELECT * FROM StoreManager.products p
WHERE p.id = ?;`, [productId]);
  return result;
};

const registerProduct = async (productName) => {
  const [result] = await connection.execute(`INSERT INTO StoreManager.products
 (name) VALUES (?);`, [productName]);

  return result;
};

module.exports = {
  listAll,
  findById,
  registerProduct,
};
