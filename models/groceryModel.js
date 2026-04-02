import mongoose from "mongoose"

let grocerySchema = new mongoose.Schema({
    name : { type : String , required : true },
    price : { type : String , default : 0 },
    rating : { type : Number , default : 0 },
    category : { type : String , default : "No Category" },
    brand : { type : String },
    warranty : { type : String , default : "No Warranty" },
    shipping : { type : String , default : "3 Days" },
    status : { type : String , default : "In Stock" },
    description : { type : String },
    image : { type : String , required : true }
},{timestamps : true})

let groceryModel = mongoose.model("grocery_product" , grocerySchema)
export default groceryModel