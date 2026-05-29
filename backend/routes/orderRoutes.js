const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const Order = require("../models/Order");

// ================= PLACE ORDER =================

router.post(
  "/place",
  authMiddleware,
  async (req, res) => {

    try {

      // ✅ USER FROM TOKEN
      const userId = req.user.id;

      const { cartItems } = req.body;

      if (
        !cartItems ||
        cartItems.length === 0
      ) {
        return res.json({
          success: false,
          message: "Cart is empty"
        });
      }

      // ✅ CREATE ITEMS ARRAY
      const items = cartItems.map(
        (item) => ({
          productId: item.productId || item._id,
          name: item.name,
          image: item.image,
          price: Number(item.price),
          quantity: Number(item.quantity),
          total:
            Number(item.price) *
            Number(item.quantity)
        })
      );

      // ✅ GRAND TOTAL
      const grandTotal = items.reduce(
        (sum, item) =>
          sum + item.total,
        0
      );

      // ✅ SAVE ORDER
      const order = await Order.create({
        userId,
        items,
        grandTotal
      });

      res.json({
        success: true,
        order
      });

    } catch (err) {

      console.log(err);

      res.json({
        success: false,
        message: err.message
      });
    }
  }
);

// ================= GET USER ORDERS =================

router.get(
  "/my-orders",
  authMiddleware,
  async (req, res) => {

    try {

      // ✅ USER FROM TOKEN
      const userId = req.user.id;

      const orders = await Order.find({
        userId
      }).sort({
        createdAt: -1
      });

      res.json({
        success: true,
        orders
      });

    } catch (err) {

      res.json({
        success: false,
        message: err.message
      });
    }
  }
);

module.exports = router;