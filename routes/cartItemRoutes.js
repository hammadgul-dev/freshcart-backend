import express from "express"
const cartItemRoutes = express.Router()
import { getCart, postCart , deleteCart, updateQnty, handleDiscount} from "../controllers/cartController.js"
import { userAuthMiddleware } from "../middleware/userAuthMiddlware.js"

cartItemRoutes.get("/" , userAuthMiddleware , getCart)
cartItemRoutes.post("/" , userAuthMiddleware , postCart)
cartItemRoutes.patch("/update/:itemId" , userAuthMiddleware , updateQnty)
cartItemRoutes.delete("/delete/:itemId" , userAuthMiddleware ,deleteCart)
cartItemRoutes.post("/discount/:code" , userAuthMiddleware , handleDiscount)

export default cartItemRoutes