import mongoose from "mongoose";

let signupSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    userEmail: { type: String, required: true, unique: true, match: /^[a-zA-Z0-9._%+-]+@gmail\.com$/ },
    userPassword: { type: String, required: true, minlength: 8 },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 60 * 60 * 24
    }
},)

let signupModel = mongoose.model("user_signup", signupSchema)
export default signupModel