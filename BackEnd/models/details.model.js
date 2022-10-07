const mongoose = require("mongoose");

const Detail = mongoose.model("detail", {
  aemail: {
    type: String,
  },
  apassword: {
    type: String,
  },
});

module.exports = Detail;
