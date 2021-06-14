const express = require('express');
require('express-group-routes');
const app = express();
const auth = require('../middleware/authenticate');
const ProductController = require('../controllers/products-controller')
const upload = require ('../middleware/upload')

app.group("/api/v1/products", (router) => {
    router.post("/", upload.array("image", 5), ProductController.store);
    router.get("/", ProductController.getall);
    router.get("/:id", ProductController.getone);
    router.put("/:id", ProductController.update);
    router.delete("/:id", ProductController.destroy);
  });
  
module.exports = app;