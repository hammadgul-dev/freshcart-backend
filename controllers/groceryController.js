import groceryData from "../data/grocery/grocery.json" with { type: "json" }
import groceryModel from "../models/groceryModel.js"

async function groceryController(req, resp) {
    try {
        await groceryModel.deleteMany({})
        let insertedData = await groceryModel.insertMany(groceryData)
        return resp.status(200).json(insertedData)
    }
    catch (e) {
        return resp.status(400).json({ message: "Failed To Fetch Grocery" })
    }
}

export { groceryController }