const { Sequelize } = require('sequelize');
const express = require("express")
const app = express()

app.use(express.json())

//database
const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
})

sequelize.authenticate()
    .then(() => console.log('Banco de dados conectado com sucesso.'))
    .catch(error => console.error('Não foi possível conectar ao banco de dados.', error))

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

module.exports = app

