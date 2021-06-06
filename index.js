const express = require('express');
const bodyParser = require('body-parser');
require('express-group-routes');
const path = require('path');
const paginate = require('express-paginate')



const AuthRoutes = require('./routes/auth-routes');
const DormRoutes = require('./routes/dorm-routes');
const BookRoutes = require('./routes/book-routes')
const ProductRoutes = require('./routes/products-routes');
const TransactiondetailRoutes = require('./routes/transaction_detail-routes')
const TransactionRoutes = require('./routes/transaction-routes')
const app = express();
const PORT = process.env.PORT || 3000;

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});


app.use(paginate.middleware(10, 50));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static('public'))
app.use(AuthRoutes);
app.use(DormRoutes);
app.use(BookRoutes);
app.use(ProductRoutes);
app.use(TransactiondetailRoutes);
app.use(TransactionRoutes);

app.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`App running on port ${PORT}`);
});
