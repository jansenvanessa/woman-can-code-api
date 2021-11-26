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

app.use("/", index)

app.use("/doctors", doctors)

module.exports = app;
