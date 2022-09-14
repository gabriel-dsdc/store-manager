const express = require('express');
const productRoutes = require('./routers/product.router');
const saleRoutes = require('./routers/sale.router');

const app = express();

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
app.use(express.json());
app.use('/products', productRoutes);
app.use('/sales', saleRoutes);
// você deve usar o arquivo server.js para executar sua aplicação 
module.exports = app;
