const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://sreejamohan444:cluster0@cluster0.mwlsecd.mongodb.net/AuthorizeDB",
  (err) => {
    if (!err) {
      console.log("DB connection successfully established");
    } else {
      console.log("Error in connecting to db", +err);
    }
  }
);

module.exports = mongoose;
