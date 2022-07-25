const express = require("express")
const config = require("config")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const gravatar = require("gravatar")
const User = require("../../models/User")
const { check, validationResult } = require("express-validator")

const router = express.Router()

// @route    -- POST api/users
// @desc     -- Register User
// @access   -- Public
router.post(
  "/",
  [
    check("name", "Name Is Required").not().isEmpty(),
    check("email", "Please Include A Valid Email").isEmail(),
    check(
      "password",
      "Please Enter a Password of 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      })
    }

    // Check if the user exists
    const { name, email, password } = req.body

    try {
      //Check If The User Already Exists
      let user = await User.findOne({ email: email })
      if (user) {
        res.status(400).json({ errors: [{ msg: "User Already Exists" }] })
      }
      // Get Users Gravatar
      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm",
      })
      //Create New User
      user = new User({
        name: name,
        email: email,
        avatar: avatar,
        password: password,
      })
      //Encrypt Password, Save User
      const salt = await bcrypt.genSalt(10)
      user.password = await bcrypt.hash(password, salt)
      await user.save()

      //Returning JWT
      const payload = {
        user: {
          id: user.id,
        },
      }
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        {
          expiresIn: 360000,
        },
        (err, token) => {
          if (err) throw err
          res.json({
            token: token,
          })
        }
      )
    } catch (err) {
      console.error(err.message)
      res.status(500).send("Server Error...")
    }
  }
)

module.exports = router
