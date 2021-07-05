const express = require("express");
require("express-group-routes");
const app = express();


const TransactionController = require("../controllers/transaction-controller");

app.group("/api/v1/transaction", (router) => {
  router.post("/", TransactionController.store);
  router.get("/", TransactionController.getall )
  router.get("/:id", TransactionController.getById)
  router.get("/detail", TransactionController.getByIdTransaction)
  router.delete('/:id', TransactionController.destroy)

});

module.exports = app;