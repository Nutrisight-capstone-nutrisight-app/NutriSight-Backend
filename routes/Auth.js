import express from "express";
const routerAuth = express.Router();

import { authenticate, createUser } from "../controller/Auth.js";

routerAuth
  .route("/login")
    .post(authenticate);

routerAuth
  .route("/register")
    .post(createUser);

export {
  routerAuth
}