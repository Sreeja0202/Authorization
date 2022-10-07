const express = require("express");
const cors = require("cors");
const Detail = require("../models/details.model.js");
const jwt = require("jsonwebtoken");

const detailrouter = express.Router();
const app = new express();

app.use(express.json());
app.use(cors());

function verifyToken(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).send("Unauthorized Request");
  }
  let token = req.headers.authorization.split("")[1];
  if (token == "null") {
    return res.status(401).send("Unauthorized Request");
  }
  let payload = jwt.verify(token, "secretkey");
  console.log(payload);
  if (!payload) {
    return res.status(401).send("Unauthorized Request");
  }
  req.userId = payload.subject;
  next();
}

detailrouter.post("/login", (req, res) => {
  let userData = req.body;
  Detail.findOne(
    {
      aemail: userData.aemail,
    },
    (err, user) => {
      if (err) {
        console.log(err);
      } else {
        if (!user) {
          res.status(401).send("Invalid Email");
        } else if (user.apassword !== userData.apassword) {
          res.status(401).send("Invalid Password");
        } else {
          let payload = { subject: user._id };
          let token = jwt.sign(payload, "secretKey");
          res.status(200).send({ token });
        }
      }
    }
  );
});

detailrouter.post("/register", verifyToken, (req, res) => {
  let userData = req.body;
  let detail = new Detail(userData);
  detail.save((err, registeredUser) => {
    if (err) {
      console.log("Error in posting details", +err);
    } else {
      let payload = {
        subject: registeredUser.aemail + registeredUser.apassword,
      };
      let token = jwt.sign(payload, "secretkey");
      res.status(200).send({ token });
    }
  });
});

module.exports = detailrouter;
