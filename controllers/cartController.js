import cartItemModel from "../models/cartItemModel.js";
import mongoose from "mongoose";

async function postCart(req, resp) {
  try {
    let userId = req.user.userId;
    let {
      itemImg,
      itemName,
      itemRating,
      itemPrice,
      itemCategory,
      itemBrand,
      itemQnty,
    } = req.body;

    let userCart = await cartItemModel.findOne({ userId })
    if (userCart) {
      let existingItem = await userCart.items.find(i =>
        i.itemName.trim().toLowerCase() === itemName.trim().toLowerCase()
      )
      if (existingItem) {
        return resp.status(409).json({ message: "Already In Cart", cart: userCart.items })
      }
      userCart.items.push({
        userId,
        itemImg,
        itemName,
        itemRating,
        itemPrice,
        itemCategory,
        itemBrand,
        itemQnty,
      })
      await userCart.save()
      return resp.status(201).json({ message: "Item Added", cart: userCart.items })
    }
    else {
      let newCart = await cartItemModel.create({
        userId,
        items: [{
          itemImg,
          itemName,
          itemRating,
          itemPrice,
          itemCategory,
          itemBrand,
          itemQnty,
        }]
      })
      return resp.status(201).json({ message: "Item Added", cart: newCart.items })
    }
  }
  catch (e) {
    return resp.status(500).json({ message: "Failed To Added In Cart" })
  }
}

async function getCart(req, resp) {
  try {
    let userId = req.user.userId
    let cartItem = await cartItemModel.findOne({ userId })
    if (cartItem)
      return resp.status(200).json(cartItem.items)
    else {
      return resp.status(200).json([])
    }
  }
  catch (e) {
    return resp.status(500).json({ message: "Failed To Fetch" });
  }
}

async function deleteCart(req, resp) {
  try {
    let userId = req.user.userId
    let { itemId } = req.params

    let userCart = await cartItemModel.findOne({ userId })

    if (!userCart)
      return resp.status(400).json({ message: "Cart Not Found!" })

    let updatedList = await cartItemModel.findOneAndUpdate(
      { userId },
      { $pull: { items: { _id: new mongoose.Types.ObjectId(itemId) } } },
      { new: true }
    )

    if (!updatedList || updatedList.items.length === 0) {
      await cartItemModel.deleteOne({ userId })
      return resp.status(200).json({ message: "All Cart Items Deleted", cart: [] })
    }

    return resp.status(200).json({ message: "Item Deleted", cart: updatedList.items })

  }
  catch (e) {
    return resp.status(500).json({ message: "Failed To Delete Item" })
  }
}

async function updateQnty(req, resp) {
  try {
    let userId = req.user.userId
    let { itemId } = req.params
    let { action } = req.body

    let userCart = await cartItemModel.findOne({ userId })

    if (!userCart)
      return resp.status(404).json({ message: "Cart Not Found" })

    let item = await userCart.items.id(itemId)

    if (!item)
      return resp.status(404).json({ message: "Item Not Found" })

    if (action === "inc") {
      item.itemQnty += 1
      await userCart.save()
      return resp.status(200).json({ message: "Quantity Increase", cart: userCart.items })
    }

    if (action === "dec") {
      if (item.itemQnty > 1) {
        item.itemQnty -= 1
        await userCart.save()
        return resp.status(200).json({ message: "Quantity Decrease", cart: userCart.items })
      }
      else {
        await userCart.items.remove(item)
        await userCart.save()
        return resp.status(200).json({ message: "Item Deleted", cart: userCart.items })
      }
    }
  }
  catch (e) {
    return resp.status(500).json({ message: "Failed To Update Quantity" })
  }
}

async function handleDiscount(req, resp) {
  try {
    let userId = req.user.userId
    let { code } = req.params

    if (!code || code.trim() === "")
      return resp.status(400).json({ message: "Enter Discount Code" })

    let userCart = await cartItemModel.findOne({ userId })

    if (!userCart)
      return resp.status(404).json({ message: "Cart Not Found" })

    let total = userCart.items.reduce((prev, curr) => {
      return prev + Number(curr.itemPrice) * Number(curr.itemQnty)
    }, 0)

    if (code === "SAVE10") {
      if (userCart.discountCode) {
        return resp.status(400).json({
          message: "Discount Already Applied",
          totalPrice: userCart.totalPrice,
          discount: userCart.totalDiscount,
          finalAmount: userCart.finalAmount
        })
      }

      let totalDiscount = total * 0.10
      let finalAmount = total - totalDiscount

      userCart.totalPrice = total
      userCart.totalDiscount = totalDiscount.toFixed(2)
      userCart.finalAmount = finalAmount
      userCart.discountCode = code
      await userCart.save()

      return resp.status(200).json({
        totalPrice: total,
        discount: totalDiscount,
        finalAmount: finalAmount
      })
    }
    return resp.status(400).json({ message: "Incorrect Code!" })
  }
  catch (e) {
    return resp.status(500).json({ message: "Failed To Apply Discount" })
  }
}

export { postCart, getCart, deleteCart, updateQnty, handleDiscount };