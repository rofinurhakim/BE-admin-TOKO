const express = require("express");
require("express-group-routes");
const app = express();
const auth = require("../middleware/authenticate");
const upload = require("../middleware/upload");

const TransactionController = require("../controllers/transaction-controller");

app.group("/api/v1/transaction", (router) => {
  router.post("/", TransactionController.store);
  router.get("/", TransactionController.getById)
  router.get("/detail", TransactionController.getByIdTransaction)
});

module.exports = app;