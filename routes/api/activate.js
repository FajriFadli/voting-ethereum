const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator/check");
const config = require("config");
const bcrypt = require("bcryptjs");

const DataAktif = require("../../models/DataAktif");

router.get("/", auth, async (req, res) => {
  try {
    const user = await DataAktif.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.post(
  "/",
  [
    check("NIK", "Masukan NIK anda").exists(),
    check("password", "Masukan password anda").exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { NIK, password } = req.body;

    try {
      let user = await DataAktif.findOne({ NIK });
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "NIK atau password anda salah" }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "NIK atau password anda salah" }] });
      }

      await DataAktif.findOneAndUpdate({ NIK }, { confirmed: true });
      // res.json({ msg: "Akun anda telah terkonfirmasi" });

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 36000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;

module.exports = router;
