const express = require("express");
const publishrideRoute = express.Router();
const PublishRide = require("../models/PublishRide");

publishrideRoute.get("/", async (req, res) => {
  try {
    const publishrideResponse = await PublishRide.find();
    res.json(publishrideResponse);
  } catch (err) {
    console.log(err);
  }
});

// publishride route with post request
publishrideRoute.post("/", async (req, res) => {
  try {
    const publishride = await PublishRide.create({
      goingfrom: req.body.goingfrom,
      goingto: req.body.goingto,
      passenger: req.body.passenger,
    });
    res.send(publishride);
  } catch (error) {
    console.log(error);
  }
});
publishrideRoute.patch("/", (req, res) => {
  res.send("we are at publishride route with patch request");
});
publishrideRoute.delete("/", (req, res) => {
  res.send("we are at publishride route with delete request");
});

module.exports = publishrideRoute;
