import express from "express";
import { routerUser } from "./routes/User.js";
import { routerAuth } from "./routes/Auth.js";
import jwt from "jsonwebtoken";

// Express Setting
const app = express();
const port = process.env.PORT || 3000;

// App Setting
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const accessValidation = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: "token is missing or invalid" });
  }

  const token = authorization.split(" ")[1];
  const secret = process.env.JWT_ACCESS_SECRET;

  try {
    const jwtDecode = jwt.verify(token, secret);
    req.user = jwtDecode;
  } catch (error) {
    return res.status(401).json({ message: "Unautorized" });
  }
  next();
};

// URL Handling
app.get("/", (req, res) => {
  res.json({ message: "Request Success" });
});
app.use("/user", accessValidation, routerUser);
app.use("/", routerAuth);

// Run Application
app.listen(port, () => {
  console.log(`NutriSight_Backend listening on http://localhost:${port}`);
});
