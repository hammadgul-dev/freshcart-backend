import path from "path"
import fs from 'fs'
import groceryModel from "../models/groceryModel.js"

async function groceryController(req , resp){
    try{
        let groceryJsonPath = path.join(process.cwd() , "data/grocery/grocery.json")
        let readGroceryFile = JSON.parse(fs.readFileSync(groceryJsonPath , "utf-8"))
        await groceryModel.deleteMany({})
        let insertedData = await groceryModel.insertMany(readGroceryFile)
        return resp.status(200).json(insertedData)
    }
    catch(e){
        return resp.status(400).json({message : "Failed To Fetch Grocery"})
    }
}

export {groceryController}