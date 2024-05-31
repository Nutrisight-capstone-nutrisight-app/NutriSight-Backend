import express from "express";
const route = express.Router();

route.post("/", (req, res) => {
  res.status(201).json("User account successfully created");
});

route.get("/:id", (req, res) => {
  res.status(200).json({
    userId: "ajab1avi1927310ks",
    name: "John Doe",
    username: "johndoe9986",
  });
});

route.patch("/:id", (req, res) => {
  res.status(201).json("User account successfully edited");
});

route.delete("/:id", (req, res) => {
  res.status(202).json("User account successfully deleted");
});
export { route };
