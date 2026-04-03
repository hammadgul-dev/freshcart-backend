import cartItemModel from "../models/cartItemModel.js"
import contactFormModel from "../models/contactFormModel.js"
import favItemModel from "../models/favoriteItemModel.js"
import signupModel from "../models/signUpFormModel.js"

async function handleLogout(req, resp) {
    try {
        let userId = req.user.userId

        await cartItemModel.deleteOne({ userId })
        await contactFormModel.deleteOne({ userId })
        await favItemModel.deleteOne({ userId })
        await signupModel.deleteOne({ _id: userId })
        return resp.status(200).json({ message: "LogOut Successfully" })
    }
    catch (e) {
        return resp.status(500).json({ message: "Error Occur During LogOut" })
    }
}

export default handleLogout