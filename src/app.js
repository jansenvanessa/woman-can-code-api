const express = require("express");
const app = express();

const doctors = require("./routes/doctors")
const index = require("./routes/index")

app.use(express.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// para que o front consiga utilizar as rotas que vamos criar precisamos dar essa permissão de acesso
app.options("/*", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers")
  res.header(
    "Access-Control-Allow-Methods",
    "PUT,POST,GET,DELETE,OPTIONS,PATCH"
  );
  res.send("send some thing whatever")
})

app.use("/", index)

app.use("/doctors", doctors)

module.exports = app;
