import mongoose from "mongoose"

async function connectDB(){
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Database Connected Succefully")
    }
    catch(e){
        console.log("Database Connection Failed")
    }
}

export default connectDB