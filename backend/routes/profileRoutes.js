const express = require("express");
const router = express.Router();

const multer = require("multer");

const authMiddleware = require("../middleware/authMiddleware");
const User = require("../models/User");

const cloudinary = require("../config/cloudinary");

// ================= MULTER =================

const storage = multer.memoryStorage();

const upload = multer({ storage });

// ================= UPDATE PROFILE =================

router.put(
  "/",
  authMiddleware,
  upload.single("image"),

  async (req, res) => {

    try {

      const userId = req.user.id;

      const updateData = {
        address: req.body.address
      };

      // ================= CLOUDINARY UPLOAD =================

      if (req.file) {

        const base64Image =
          `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;

        const result =
          await cloudinary.uploader.upload(
            base64Image,
            {
              folder: "profiles"
            }
          );
          console.log("Cloudinary URL:", result.secure_url);
        updateData.image =
          result.secure_url;
      }

      // ================= UPDATE USER =================

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