import mongoose from "mongoose";

let cartItemSchema = new mongoose.Schema({
  userId : { type : mongoose.Schema.Types.ObjectId , ref : "user_signups" , required : true },
  items : [
    {
      itemImg: { type: String, required: true },
      itemName: { type: String, required: true, default: "No Title" },
      itemRating: { type: Number, default: 4.5 },
      itemPrice: { type: Number, default: 34 },
      itemCategory: { type: String, required: true, default: "No Category" },
      itemBrand: { type: String, required: true, default: "No Brand" },
      itemQnty: { type: Number, required: true, default: 1 },
    },
  ],
  
  totalPrice : { type : Number , default : 0 },
  totalDiscount : { type : Number , default : 0 },
  finalAmount : { type : Number , default : 0 },
  discountCode : { type : String , default : "" },

} , {timestamps : true});

let cartItemModel = mongoose.model("user_cart" , cartItemSchema)
export default cartItemModel