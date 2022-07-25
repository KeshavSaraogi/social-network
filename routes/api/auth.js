const express = require("express")
const config = require("config")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const User = require("../../models/User")
const auth = require("../../middleware/auth")
const { check, validationResult } = require("express-validator")

const router = express.Router()

// @route    -- GET api/auth
// @desc     -- Test Route
// @access   -- Public
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password")
    res.json(user)
  } catch (err) {
    console.error(err.message)
    res.status(500).json("Server Error")
  }
})

// @route    -- POST api/auth
// @desc     -- Authenticate User, Get Token
// @access   -- Public
router.post(
  "/",
  [
    check("email", "Please Include A Valid Email").isEmail(),
    check("password", "Password Is Required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    // Check if the user exists
    const { email, password } = req.body

    try {
      //Check If The User Already Exists
      let user = await User.findOne({ email: email })
      if (!user) {
        res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] })
      }

      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) {
        res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] })
      }

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
