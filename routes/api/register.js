const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator/check");
const bcrypt = require("bcryptjs");
const config = require("config");
const nodemailer = require("nodemailer");

const DataPemilih = require("../../models/DataPemilih");
const DataAktif = require("../../models/DataAktif");

router.post(
  "/",
  [
    check("NIK", "Masukan NIK anda")
      .not()
      .isEmpty(),
    check("NKK", "Masukan No. KK anda")
      .not()
      .isEmpty(),
    check("nama", "Masukan nama anda sesuai pada KTP")
      .not()
      .isEmpty(),
    check("email", "Masukan email anda").isEmail(),
    check("password", "Masukan password dengan 6 karakter atau lebih").isLength(
      { min: 6 }
    )
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { NIK, NKK, nama, tanggalLahir, email, password } = req.body;

    try {
      let user = await DataPemilih.findOne({ NIK: NIK, NKK: NKK, nama: nama });
      let userTerdaftar = await DataAktif.findOne({ NIK });
      if (!user) {
        return res.status(400).json({
          errors: [
            {
              msg:
                "Data anda belum terdaftar sebagai pemilih tetap, pastikan NIK, No. KK, dan nama anda sudah dimasukan dengan benar"
            }
          ]
        });
      }

      if (userTerdaftar && user) {
        return res.status(400).json({
          errors: [
            {
              msg: "Anda sudah terdaftar, silahkan lakukan login"
            }
          ]
        });
      }

      user = new DataAktif({
        NIK,
        email,
        password
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const transporter = nodemailer.createTransport({
        service: "Gmail",
        tls: { rejectUnauthorized: false },
        auth: {
          user: config.adminEmail,
          pass: config.emailPass
        }
      });

      const info = await transporter.sendMail({
        from: '"Pemilu RT XYZ" <pemilu.rt11@gmail.com>',
        to: user.email,
        subject: "Konfirmasi Akun Pemilihian RT",
        text:
          "Click https://pemilurt.herokuapp.com/activate untuk mengaktivasi akun anda",
        html:
          '<p>Click <a href="https://pemilurt.herokuapp.com/activate">disini</a> untuk mengaktivasi akun anda</p>'
      });

      res.json({ msg: `Message sent, Message ID: ${info.messageId}` });
    } catch (err) {
      console.error(err);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
