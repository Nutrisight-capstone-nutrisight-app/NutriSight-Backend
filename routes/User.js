import express from "express";
const routerUser = express.Router();

import { getUserById, editUser, deleteUser } from "../controller/User.js";

routerUser.route("/")
  .get(getUserById)
  .patch(editUser)
  .delete(deleteUser);

export { routerUser };
