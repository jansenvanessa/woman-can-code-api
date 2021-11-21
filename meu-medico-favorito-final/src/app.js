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
        "Origin, X-Request-With, Content-Type, Accept"
    )
    next()
    // como criei uma função dentro do app.use, preciso dar um "next()" para mandar ele seguir para a próxima middleware. 
    // se eu não faço isso, a requisição vai ficar travada aí.
})

app.options("/*", (req, res) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers")
    res.header(
        "Access-Control-Allow-Methods",
        "PUT,POST,GET,DELETE,OPTIONS,PATCH"
    );
    res.send("send some thing whatever")
})

// para que o front consiga utilizar as rotas que vamos criar precisamos dar essa permissão de acesso
app.use("/", index)
app.use("/doctors", doctors)

module.exports = {
    app
}

