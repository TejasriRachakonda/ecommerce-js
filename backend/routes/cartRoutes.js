const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const Cart = require("../models/Cart");

// ================= ADD TO CART =================

router.post("/", authMiddleware, async (req, res) => {
  try {

    // ✅ USER FROM TOKEN
    const userId = req.user.id;

    const {
      productId,
      name,
      image,
      price,
      quantity
    } = req.body;

    // ✅ CHECK EXISTING ITEM
    const existingItem = await Cart.findOne({
      userId,
      productId
    });

    // ✅ IF ITEM EXISTS -> INCREASE QUANTITY
    if (existingItem) {

      existingItem.quantity += 1;

      await existingItem.save();

      return res.json({
        success: true,
        message: "Quantity Updated",
        cartItem: existingItem
      });
    }

    // ✅ CREATE NEW ITEM
    const cartItem = await Cart.create({
      userId,
      productId,
      name,
      image,
      price,
      quantity
    });

    res.json({
      success: true,
      message: "Item Added To Cart",
      cartItem
    });

  } catch (err) {

    console.log(err);

    res.json({
      success: false,
      message: err.message
    });
  }
});

// ================= GET USER CART =================

router.get("/", authMiddleware, async (req, res) => {
  try {

    const userId = req.user.id;

    const cartItems = await Cart.find({ userId });

    res.json({
      success: true,
      cartItems
    });

  } catch (err) {

    console.log(err);

    res.json({
      success: false,
      message: err.message
    });
  }
});

// ================= INCREASE QUANTITY =================

router.put("/increase/:id", authMiddleware, async (req, res) => {
  try {

    const cartItem = await Cart.findById(req.params.id);

    if (!cartItem) {
      return res.json({
        success: false,
        message: "Cart Item Not Found"
      });
    }

    cartItem.quantity += 1;

    await cartItem.save();

    res.json({
      success: true,
      message: "Quantity Increased",
      cartItem
    });

  } catch (err) {

    console.log(err);

    res.json({
      success: false,
      message: err.message
    });
  }
});

// ================= DECREASE QUANTITY =================

router.put("/decrease/:id", authMiddleware, async (req, res) => {
  try {

    const cartItem = await Cart.findById(req.params.id);

    if (!cartItem) {
      return res.json({
        success: false,
        message: "Cart Item Not Found"
      });
    }

    // ✅ REMOVE ITEM IF QUANTITY = 1
    if (cartItem.quantity === 1) {

      await Cart.findByIdAndDelete(req.params.id);

      return res.json({
        success: true,
        message: "Item Removed"
      });
    }

    cartItem.quantity -= 1;

    await cartItem.save();

    res.json({
      success: true,
      message: "Quantity Decreased",
      cartItem
    });

  } catch (err) {

    console.log(err);

    res.json({
      success: false,
      message: err.message
    });
  }
});

// ================= REMOVE ITEM =================

router.delete("/:id", authMiddleware, async (req, res) => {
  try {

    await Cart.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Item Removed From Cart"
    });

  } catch (err) {

    console.log(err);

    res.json({
      success: false,
      message: err.message
    });
  }
});

// ================= CLEAR CART =================

router.delete("/clear/all", authMiddleware, async (req, res) => {
  try {

    const userId = req.user.id;

    await Cart.deleteMany({ userId });

    res.json({
      success: true,
      message: "Cart Cleared"
    });

  } catch (err) {

    console.log(err);

    res.json({
      success: false,
      message: err.message
    });
  }
});

module.exports = router;