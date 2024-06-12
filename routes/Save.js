import express from "express";
const routerSave = express.Router();
import { createSave, getSavedByUserId } from "../controller/Save.js";

routerSave
    .route("/")
        .post(createSave)
        .get(getSavedByUserId);

export { routerSave };
