const express = require("express");
const router = express.Router();

const multer = require("multer");
const path = require("path");

const authMiddleware = require("../middleware/authMiddleware");
const User = require("../models/User");

// ================= MULTER =================

const storage = multer.diskStorage({

  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    cb(
      null,
      Date.now() + path.extname(file.originalname)
    );
  }
});

const upload = multer({ storage });

// ================= UPDATE PROFILE =================

router.put(
  "/",
  authMiddleware,
  upload.single("image"),

  async (req, res) => {

    try {

      const userId = req.user.id;

      // ✅ CREATE OBJECT FIRST
      const updateData = {
        address: req.body.address
      };

      // ✅ IMAGE
      if (req.file) {

        updateData.image =
          "uploads/" + req.file.filename;
      }

      // ✅ UPDATE USER
      const updatedUser =
        await User.findByIdAndUpdate(
          userId,
          updateData,
          { new: true }
        );

      res.json({
        success: true,
        user: updatedUser
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

module.exports = router;