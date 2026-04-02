import express from "express"
import {deleteFavItems, getFavItem, handleFavItems} from "../controllers/userFavoriteController.js"
import { userAuthMiddleware } from "../middleware/userAuthMiddlware.js"

let favItemRoutes = express.Router()

favItemRoutes.post("/" , userAuthMiddleware , handleFavItems)
favItemRoutes.get("/" , userAuthMiddleware , getFavItem)
favItemRoutes.delete("/delete/:itemId" , userAuthMiddleware , deleteFavItems)

export default favItemRoutes