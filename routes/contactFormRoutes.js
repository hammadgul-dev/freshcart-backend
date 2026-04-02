import express from "express"
import handleContactForm from "../controllers/contactFormController.js"
import { userAuthMiddleware } from "../middleware/userAuthMiddlware.js"

const contactRoute = express.Router()

contactRoute.post("/" , userAuthMiddleware , handleContactForm)

export default contactRoute