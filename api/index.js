import express from "express"
import dotenv from "dotenv"
import connectDB from "../config/db.js"
import cors from "cors"
import signupRoutes from "../routes/signUpFormRoutes.js"
import groceryRoutes from "../routes/groceryRoutes.js"
import productRoutes from "../routes/productRoutes.js"
import contactRoute from "../routes/contactFormRoutes.js"
import cartItemRoutes from "../routes/cartItemRoutes.js"
import favItemRoutes from "../routes/favoriteItemRoutes.js"
import logOutRoutes from "../routes/logOutRoutes.js"

dotenv.config()

const app = express()

app.use(express.json())
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}))
app.use(express.urlencoded({ extended: false }))

app.use("/signup", signupRoutes)
app.use("/grocery", groceryRoutes)
app.use("/product", productRoutes)
app.use("/contact-us", contactRoute)
app.use("/cart-items", cartItemRoutes)
app.use("/favorite", favItemRoutes)
app.use("/logout", logOutRoutes)

app.use((req, resp) => {
    return resp.status(404).json({ message: "Route Not Found" })
})

const startServer = async () => {
  await connectDB()
}
startServer()

export default app
