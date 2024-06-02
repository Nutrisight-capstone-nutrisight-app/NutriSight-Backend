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
  res.json("Request Success");
});
app.use("/user", routerUser);


// Run Application 
app.listen(port, () => {
  console.log(`NutriSight_Backend listening on http://localhost:${port}`);
});
