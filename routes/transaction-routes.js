const express = require('express');
require('express-group-routes');
const app = express();
const auth = require('../middleware/authenticate');
const TransactionController = require('../controllers/transaction-controller')

app.group('/api/v1/transaction', router => {

    router.post('/', TransactionController.store);
    router.get('/', TransactionController.getall)

  
});

module.exports = app;