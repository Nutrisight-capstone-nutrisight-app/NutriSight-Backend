import express from "express";
const routerUser = express.Router();

import {
  getAllUsers,
  getUserById,
  createUser,
  editUser,
  deleteUser,
} from "../controller/User.js";

routerUser
  .route("/")
    .get(getAllUsers)
    .post(createUser);

routerUser
  .route("/:id")
    .get(editUser)
    .patch(editUser)
    .delete(deleteUser);

// routerUser.get("/", getAllUsers);
// routerUser.post("/", createUser);
// routerUser.get("/:id", getUserById);
// routerUser.patch("/:id", editUser);
// routerUser.delete("/:id", deleteUser);

export { routerUser };
