import express from "express";
const routerProduct = express.Router();
import { getProductById } from "../controller/Product.js";

routerProduct.route("/:id").get(getProductById);

export { routerProduct };
