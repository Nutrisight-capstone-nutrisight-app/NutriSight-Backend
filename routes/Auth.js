import express from "express";
const routerAuth = express.Router();

import { authenticate, createUser, deleteToken } from "../controller/Auth.js";
import { accessValidation } from "../middleware/UserAuth.js";

routerAuth
  .route("/login")
    .post(authenticate);

routerAuth
  .route("/register")
    .post(createUser);

routerAuth.use(accessValidation);
routerAuth
  .route("/logout")
    .delete(deleteToken);

export {
  routerAuth
}