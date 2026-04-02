import express from "express"
import { userAuthMiddleware } from "../middleware/userAuthMiddlware.js"
import handleLogout from "../controllers/logoutController.js"

let logOutRoutes = express.Router()

logOutRoutes.post("/" , userAuthMiddleware , handleLogout)

export default logOutRoutes