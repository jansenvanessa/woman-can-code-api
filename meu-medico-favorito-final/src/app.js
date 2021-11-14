const express = require("express")
const app = express()
app.use(express.json())

//routes
const index = require("./routes/index")
const doctors = require("./routes/doctors")

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Request-with, Content-Type, Accept"
    )
    next()
})

app.use("/", index)
app.use("/doctors", doctors)

module.exports = {
    app
}

