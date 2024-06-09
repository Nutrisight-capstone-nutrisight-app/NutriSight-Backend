import express from "express";
const routerProduct = express.Router();

import { getProductByName } from "../controller/Product.js";

routerProduct.route("/:name")
  .get(getProductByName)

export { routerProduct };