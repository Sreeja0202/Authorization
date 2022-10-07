const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");
const mongoose = require("./db.js");
const detailrouter = require("./routes/details.routes");
const app = new express();

app.use(cors());
app.use(express.json());
app.use("/api", detailrouter);

// /api can be replaced with anything, if nothing is given also i.ie., '/' then also it will work...in the route file whatever is given '/' after, that matters

// app.get("/", function (req, res) {
//   res.send("Hello from Server");
// });

app.listen(3000, function () {
  console.log("Server running on localhost 3000");
});
