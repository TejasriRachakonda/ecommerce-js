const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");


// ================= REGISTER =================
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    // 🔍 Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({
        success: false,
        message: "Email already exists"
      });
    }

    // 🔐 Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 🧾 Create new user
    const newUser = new User({
      name,
      email,
      phone,
      password: hashedPassword
    });

    // 💾 Save to DB
    await newUser.save();

    res.json({
      success: true,
      message: "Registered successfully"
    });

  } catch (err) {
    console.log(err);
    res.json({
      success: false,
      message: "Server error"
    });
  }
});


// ================= LOGIN =================
// ================= LOGIN =================
router.post("/login", async (req, res) => {

  try {

    const { email, password } = req.body;

    // ✅ FIND USER
    const user = await User.findOne({ email });

    if (!user) {

      return res.json({
        success: false,
        message: "User not found"
      });
    }

    // ✅ PASSWORD CHECK
    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {

      return res.json({
        success: false,
        message: "Invalid Password"
      });
    }

    // ✅ APPROVAL CHECK
    if (user.isApproved === false) {

      return res.json({
        success: false,
        message: "Admin approval pending"
      });
    }

    // ✅ CREATE TOKEN
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "120d"
      }
    );

    // ✅ SUCCESS
    res.json({
      success: true,
      message: "Login Successful",
      token,
      user
    });

  } catch (err) {

    console.log("Login error",err);

    res.json({
      success: false,
      message: err.message
    });
  }
});


// ================= EXPORT =================
module.exports = router;