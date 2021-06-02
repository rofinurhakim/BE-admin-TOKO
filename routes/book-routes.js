const express = require('express');
require('express-group-routes');
const app = express();
const auth = require('../middleware/authenticate');

const BookController = require('../controllers/book-controller');

app.group('/api/v1/booking', router => {
    router.use(auth.authorize);
    router.use(auth.handleAuthError);
    router.get('/', BookController.show);
    router.get('/orders', BookController.orders);
    router.get('/:id', BookController.showdetail);
    router.post('/', BookController.store);
    router.patch('/:id', BookController.edit)
});

module.exports = app;
