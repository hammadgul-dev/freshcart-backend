import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import signupModel from "../models/signUpFormModel.js"


async function handleSignupForm(req, resp) {
    try {
        let { firstName, lastName, userEmail, userPassword } = req.body

        if (!userEmail)
            return resp.status(400).json({ message: "Email Is Required" })
        if (userPassword.length < 8)
            return resp.status(400).json({ message: "Password Is Too Short" })

        let ifEmailExists = await signupModel.findOne({ userEmail })

        if (ifEmailExists)
            return resp.status(400).json({ message: "Email Already Registered!" })
        let hashPassword = await bcrypt.hash(userPassword, 10)
        let newUser = await signupModel.create({
            firstName,
            lastName,
            userEmail,
            userPassword: hashPassword,
        })

        let token = jwt.sign(
            { userId: newUser._id, userEmail },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        )

        resp.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000,
        })

        resp.status(201).json({ message: "Signup Successfully", newUser: { firstName, lastName }, userId: newUser._id })
    }
    catch (e) {
        resp.status(500).json({ message: "Error Occur During Signup" })
    }
}

async function handleVerifyToken(req, resp) {
    try {
        let user = await signupModel.findById(req.user.userId)
        if (user)
            return resp.status(200).json({ isLogged: true })
    }
    catch (e) {
        return resp.status(400).json({ message: "Something Went Wrong" })
    }

}

export { handleSignupForm, handleVerifyToken }