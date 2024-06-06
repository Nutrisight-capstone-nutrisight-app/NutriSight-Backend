import express from "express";
const routerUser = express.Router();

import {
  getUserById,
  editUser,
  deleteUser,
} from "../controller/User.js";

routerUser
  .route("/:id")
    .get(getUserById)
    .patch(editUser)
    .delete(deleteUser);

export { routerUser };
