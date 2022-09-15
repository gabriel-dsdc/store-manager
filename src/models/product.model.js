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

const updateProduct = async (productId, newProductName) => {
  const [result] = await connection.execute(`UPDATE StoreManager.products
SET name = ? WHERE id = ?;`, [newProductName, productId]);
  return result;
};

const deleteProduct = async (productId) => {
  const [result] = await connection.execute(`DELETE FROM StoreManager.products p
WHERE p.id = ?;`, [productId]);
  return result;
};

const searchProductByName = async (productName) => {
  const [result] = await connection.execute(`SELECT * FROM StoreManager.products p
WHERE p.name LIKE ?;`, [`%${productName}%`]);
  return result;
};

module.exports = {
  listAll,
  findById,
  registerProduct,
  updateProduct,
  deleteProduct,
  searchProductByName,
};
