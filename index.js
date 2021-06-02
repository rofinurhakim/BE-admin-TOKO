const express = require('express');
const bodyParser = require('body-parser');
require('express-group-routes');
const path = require('path');



const AuthRoutes = require('./routes/auth-routes');
const DormRoutes = require('./routes/dorm-routes');
const BookRoutes = require('./routes/book-routes')

const app = express();
const PORT = process.env.PORT || 3000;


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static('public'))
app.use(AuthRoutes);
app.use(DormRoutes);
app.use(BookRoutes);


app.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`App running on port ${PORT}`);
});
