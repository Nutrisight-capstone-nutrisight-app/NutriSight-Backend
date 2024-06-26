import express from "express";
import { routerUser } from "./routes/User.js";
import { routerAuth } from "./routes/Auth.js";
import { routerProduct } from "./routes/Product.js";
import { routerSave } from "./routes/Save.js";
import { accessValidation } from "./middleware/UserAuth.js";

// Express Setting
const app = express();
const port = process.env.PORT || 3000;

// App Setting
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// URL Handling
app.get("/", (req, res) => {
  res.json({ message: "Nutrisight API v0.3.0 :Request Success" });
});
app.use("/product", routerProduct);
app.use("/user", accessValidation, routerUser);
app.use("/save", accessValidation, routerSave);
app.use("/", routerAuth);

// Run Application
app.listen(port, () => {
  console.log(`NutriSight_Backend listening on http://localhost:${port}`);
});
