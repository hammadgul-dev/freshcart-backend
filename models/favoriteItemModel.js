import mongoose from "mongoose"

let favoriteItemSchema = new mongoose.Schema({
    userId : { type : mongoose.Schema.Types.ObjectId, required : true, ref : "user_auth" },
    userFavorite : [
        { 
            itemId : {  type : String , require : true},
            itemImg : { type : String , required : true },
            itemName : { type : String , required : true , default : "No Title" },
        }
    ]

},{ timestamps : true })

let favItemModel = mongoose.model("user_favorite" , favoriteItemSchema)
export default favItemModel