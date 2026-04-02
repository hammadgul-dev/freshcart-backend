import express from 'express'
import { handleSignupForm, handleVerifyToken } from '../controllers/signUpFormController.js'
import { userAuthMiddleware } from '../middleware/userAuthMiddlware.js'

let signupRoutes = express.Router()

signupRoutes.post("/" , handleSignupForm)
signupRoutes.get("/verify-token", userAuthMiddleware, handleVerifyToken)

export default signupRoutes