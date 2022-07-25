const express = require("express")
const connectDB = require("./config/db")
const users = require("./routes/api/users")
const auth = require("./routes/api/auth")
const profile = require("./routes/api/profile")
const posts = require("./routes/api/posts")

const app = express()
connectDB()

//Middleware
app.use(express.json({ extended: false }))

app.get("/", (req, res) => res.send("API IS RUNNING"))

//Routes
app.use("/api/users", users)
app.use("/api/auth", auth)
app.use("/api/profile", profile)
app.use("/api/posts", posts)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server Running On Port ${PORT}`))
