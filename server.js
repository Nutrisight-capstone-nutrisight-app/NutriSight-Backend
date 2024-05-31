import express from "express";
const app = express();
const port = 3000;
import { route } from "./routes/users.js";

app.get("/", (req, res) => {
  res.send("Request Success");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.use("/users", route);
