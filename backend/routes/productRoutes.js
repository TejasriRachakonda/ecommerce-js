const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const authMiddleware = require("../middleware/authMiddleware");

// ✅ SCHEMA
const ProductSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String,
  category: String,
  subCategory: String,
  isRecommended: {
    type: Boolean,
    default: false
  }
});

// ✅ MODEL (IMPORTANT: define BEFORE using)
const Product =
  mongoose.models.Product || mongoose.model("Product", ProductSchema);

// ================= CREATE =================
router.post("/", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.json(product);
  } catch (err) {
    console.log(err);
    res.json({ message: "Error creating product" });
  }
});

// ================= GET ALL =================
router.get("/", authMiddleware, async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    console.log(err);
    res.json({ message: "Error fetching products" });
  }
});

// ================= GET RECOMMENDED =================
router.get("/recommended", async (req, res) => {
  try {
    const products = await Product.find({ isRecommended: true });
    console.log("RECOMMENDED:", products); // debug
    res.json(products);
  } catch (err) {
    console.log(err);
    res.json({ message: "Error fetching recommended products" });
  }
});

// ================= UPDATE =================
router.put("/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(product);
  } catch (err) {
    console.log(err);
    res.json({ message: "Error updating product" });
  }
});

// ================= DELETE =================
router.delete("/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    console.log(err);
    res.json({ message: "Error deleting product" });
  }
});

module.exports = router;