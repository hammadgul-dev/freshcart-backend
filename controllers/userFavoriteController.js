import favItemModel from "../models/favoriteItemModel.js";
import mongoose from "mongoose";

async function handleFavItems(req, resp) {
  try {
    let userId = req.user.userId;
    let { itemImg, itemName, itemId } = req.body;

    let userFavList = await favItemModel.findOne({ userId })

    if (userFavList) {
      let existingItem = await userFavList.userFavorite.find(f => f.itemName.toLowerCase() === itemName.toLowerCase())

      if (existingItem)
        return resp.status(409).json({ message: "Already In Favorite List" })
      else {
        await userFavList.userFavorite.push({
          itemId, itemName, itemImg
        })
        await userFavList.save()
        return resp.status(201).json({ message: "Item Added", favorite: userFavList.userFavorite })
      }
    }
    else {
      let favList = await favItemModel.create({
        userId,
        userFavorite: [{ itemId, itemName, itemImg }]
      })
      return resp.status(201).json({ message: "Item Added", favorite: favList.userFavorite })
    }

  } catch (e) {
    return resp.status(500).json({ message: "Failed To Add Item" });
  }
}


async function getFavItem(req, resp) {
  try {
    let userId = req.user.userId
    let favoriteList = await favItemModel.findOne({ userId })
    if (!favoriteList)
      return resp.status(200).json([])
    else {
      return resp.status(200).json(favoriteList.userFavorite)
    }
  }
  catch (e) {
    return resp.status(500).json({ message: "Failed To Fetch" });
  }
}

async function deleteFavItems(req, resp) {
  try {
    let userId = req.user.userId
    let { itemId } = req.params

    let userList = await favItemModel.findOne({ userId })

    if (!userList)
      return resp.status(400).json({ message: "No Favorite List Found" })

    let updatedList = await favItemModel.findOneAndUpdate(
      { userId },
      { $pull: { userFavorite: { _id: new mongoose.Types.ObjectId(itemId) } } },
      { new: true }
    )

    if (!updatedList.userFavorite || updatedList.userFavorite.length === 0) {
      await favItemModel.deleteOne({ userId })
      return resp.status(200).json({ message: "All Favorite Items Deleted", favorite: [] })
    }
    resp.status(200).json({ message: "Item Deleted", favorite: updatedList.userFavorite })
  }
  catch (e) {
    resp.status(500).json({ message: "Failed To Delete Item" })
  }
}

export { handleFavItems, getFavItem, deleteFavItems };
