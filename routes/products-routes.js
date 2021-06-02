const express = require('express');
require('express-group-routes');
const app = express();
const auth = require('../middleware/authenticate');
const ProductController = require('../controllers/products-controller')

app.group('/api/v1/products', router => {

    router.post('/', ProductController.store);
    router.get('/', ProductController.getall)

  
});

module.exports = app;