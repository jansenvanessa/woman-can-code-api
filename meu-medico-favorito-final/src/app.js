const express = require("express")
const app = express()
app.use(express.json())

//rotas
const index = require("./routes/index")
const doctors = require("./routes/doctors")

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Request-With, Content-Type, Accept"
    )
    next()
})

app.options("/*", (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers");
    res.header(
        "Access-Control-Allow-Methods",
        "PUT,POST,GET,DELETE,OPTIONS,PATCH"
    );
    res.send("send some thing whatever");
});

app.use("/", index)
app.use("/doctors", doctors)

module.exports = {
    app
}

