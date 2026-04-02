import contactFormModel from "../models/contactFormModel.js"
import signupModel from "../models/signUpFormModel.js"
import nodemailer from "nodemailer"

async function handleContactForm(req, resp) {
    try {
        let userId = req.user.userId
        let { userName, userEmail, userMessage } = req.body

        let findingUser = await signupModel.findById(userId)

        if (!findingUser)
            return resp.status(404).json({ message: "Email Not Found Please Sign Up" })

        if(findingUser && userEmail !== findingUser.userEmail)
            return resp.status(400).json({message : "Use Your Registered Email"})

        if (!userEmail)
            return resp.status(400).json({ message: "Email Is Required" })

        else if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(userEmail))
            return resp.status(400).json({ message: "Invalid Email Address" })

        else if (!userMessage)
            return resp.status(400).json({ message: "Message Is Required" })

        let ifEmailExists = await contactFormModel.findOne({ userId })

        if (ifEmailExists)
            return resp.status(400).json({ message: "Message Already Sent" })

        await contactFormModel.create({
            userId,
            userName,
            userEmail,
            userMessage,
        })

        let emailTransporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.APP_GMAIL,
                pass: process.env.APP_PASSWORD,
            }
        })

        await emailTransporter.sendMail({
            from: process.env.APP_GMAIL,
            to: userEmail,
            subject: "Message From FreshCart",
            text: `Hi ${userName}, Thanks for contacting FreshCart. We’ve received your message: "${userMessage}" We’ll get back to you shortly.`,
            replyTo: process.env.APP_GMAIL,
        })
        resp.status(201).json({ message: "Message Sent Check Your Email" })
    }
    catch (e) {
        resp.status(500).json({ message: "Failed To Send Message" })
    }

}

export default handleContactForm