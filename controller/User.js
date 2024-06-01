import { users } from "../model/User.js";

export const getAllUsers = (req, res) => {
  return res.json(users);
};

export const getUserById = (req, res) => {
  const id = req.params.id;
  const user = users.filter((user) => user.id == id)[0];
  return res.json(user);
};

export const editUser = (req, res) => {

}

export const createUser = (req, res) => {

}

export const deleteUser = (req, res) => {

}

