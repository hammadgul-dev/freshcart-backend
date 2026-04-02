import { groceryController } from "../controllers/groceryController.js";
import express from "express"

let groceryRoutes  = express.Router()

groceryRoutes.get("/" , groceryController)

export default groceryRoutes