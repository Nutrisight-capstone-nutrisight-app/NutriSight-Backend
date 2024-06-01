import express from "express";
import { routerUser } from "./routes/User.js";

// Express Setting
const app = express();
const port = process.env.PORT || 3000;

// App Setting
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// URL Handling
app.get("/", (req, res) => {
  res.send("Request Success");
});
app.use("/user", routerUser);

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});
