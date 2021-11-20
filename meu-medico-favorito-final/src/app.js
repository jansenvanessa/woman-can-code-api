const express = require("express");
const app = express();

//rotas
const index = require("./routes/index");

app.use(express.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use("/", index);

// app.patch("/cors", (req, res) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Content-Type,Content-Length,Server,Date,access-control-allow-methods,access-control-allow-origin"
//   );
//   res.header(
//     "Access-Control-Allow-Methods",
//     "PUT,POST,GET,DELETE,OPTIONS,PATCH"
//   );
//   res.send("ok");
// });

app.options("/*", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers"
    // "Content-Type,Content-Length,Server,Date,access-control-allow-methods,access-control-allow-origin"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "PUT,POST,GET,DELETE,OPTIONS,PATCH"
  );
  res.send("send some thing whatever");
});

const doctors = require("./routes/doctors");
app.use("/doctors", doctors);

module.exports = app;
