import express from "express";
const routerUser = express.Router();

import {
  getUserById,
  createUser,
  editUser,
  deleteUser,
} from "../controller/User.js";

routerUser
  .route("/")
    .post(createUser);

routerUser
  .route("/:id")
    .get(getUserById)
    .patch(editUser)
    .delete(deleteUser);

export { routerUser };
