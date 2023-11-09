const express = require("express");
let routes = express.Router();
let { ApiController } = require("../controller/apiController");
const { authentication } = require("../middleware/authentication");

routes.get("/", (req, res, next) => {
  res.send("welcome to api JECO");
});

routes.post("/login", ApiController.login);

routes.use(authentication)

routes.post("/add-admin", ApiController.addNewAdmin);

routes.get("/category",ApiController.getAllCategory);
routes.post("/category",ApiController.addNewCategory);
routes.get("/category/:id",ApiController.getCategoryById);
routes.patch("/category/:id",ApiController.editCategoryById);
routes.delete("/category/:id",ApiController.deleteCategory);

routes.get("/item", ApiController.getAllItem);
routes.post("/item", ApiController.addNewItem);
routes.get("/item/:id", ApiController.getItemById);
routes.put("/item/:id", ApiController.updateItemById);
routes.delete("/item/:id", ApiController.deleteItemById);


module.exports = routes;
