const express = require('express');
const productRoutes = require('./routers/product.router');

const app = express();

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
app.use(express.json());
app.use('/products', productRoutes);
// você deve usar o arquivo server.js para executar sua aplicação 
module.exports = app;
