const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    items: [
      {
        productId: String,
        name: String,
        price: Number,
        image: String,
        quantity: Number,
        total: Number
      }
    ],

    grandTotal: {
      type: Number,
      required: true
    },

    collageImage: {
      type: [String] // store multiple images
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);