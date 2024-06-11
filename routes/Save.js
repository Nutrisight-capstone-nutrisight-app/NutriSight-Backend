import express from "express";
const routerSave = express.Router();
import { createSave, getSavedbyId } from "../controller/Save.js";

routerSave.route("/").post(createSave);
routerSave.route("/:id").get(getSavedbyId);

export { routerSave };
