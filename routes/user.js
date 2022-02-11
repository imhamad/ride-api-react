const express = require("express");
const userRoute = express.Router();
const User = require("../models/User");
const Joi = require("joi");
const bcrypt = require("bcrypt");

const userSchema = Joi.object({
  fullName: Joi.string().min(3).max(100).required(),
  userName: Joi.string().alphanum().min(3).max(100).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(3).max(50).required(),
  userType: Joi.string().min(3).max(20).required(),
});

userRoute.get("/", (req, res) => {
  res.send("we are at user route with get request...");
});

// publishride route with post request
userRoute.post("/register", async (req, res) => {
  const validationMsg = userSchema.validate(req.body);

  if (validationMsg.error) {
    res.send(validationMsg.error.details[0].message);
  } else {
    const alreadyUser = await User.findOne({ email: req.body.email });
    if (alreadyUser) {
      res.send("User has already Register...");
    } else {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(req.body.password, salt);

      // insert into DB!!!
      const userRegResponse = await User.create({
        fullName: req.body.fullName,
        userName: req.body.userName,
        email: req.body.email,
        password: hash,
        userType: req.body.userType,
      });
      res.send(userRegResponse.fullName + " has successfully register");
    }
  }
});
userRoute.post("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const user = await User.findOne({ email: email });
  if (!user) {
    res.send("User not found...");
  } else {
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      res.send("Invalid Password...");
    } else {
      res.send("Login Successfully...");
    }
  }
});
userRoute.patch("/", (req, res) => {
  res.send("we are at user route with patch request...");
});
userRoute.delete("/", (req, res) => {
  res.send("we are at user route with delete request...");
});

module.exports = userRoute;
