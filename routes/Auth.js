import express from "express";
const routerAuth = express.Router();

import { authenticate } from "../controller/Auth.js";

routerAuth
  .route("/login")
    .post(authenticate);

export {
  routerAuth
}