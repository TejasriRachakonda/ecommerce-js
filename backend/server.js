require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const profileRoutes = require("./routes/profileRoutes");

const app = express();

// ================= MIDDLEWARE =================

app.use(cors());

app.use(express.json());

app.use(
  "/uploads",
  express.static("uploads")
);

// ================= ROUTES =================

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

app.use("/api/cart", cartRoutes);

app.use("/api/orders", orderRoutes);


app.use("/api/profile", profileRoutes);

// ================= MONGODB =================

mongoose.connect(process.env.MONGO_URL)

.then(() => {

  console.log("MongoDB Connected");

  // ✅ START SERVER ONLY AFTER DB CONNECTS
  app.listen(5000, () => {

    console.log("Server Running On 5000");
  });

})

.catch((err) => {

  console.log(err);
});