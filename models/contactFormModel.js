import mongoose from "mongoose";

let contactFormSchema = new mongoose.Schema({
    userId : { type : mongoose.Schema.Types.ObjectId , required : true , ref : "user_signups" },
    userName : { type : String , required : true },
    userEmail : { type : String , required : true , unique : true , match : /^[a-zA-Z0-9._%+-]+@gmail\.com$/ },
    userMessage : { type : String , required : true }
}, { timestamps: true })

let  contactFormModel = mongoose.model("user_contact" , contactFormSchema)
export default contactFormModel