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

// Single user publish rides 
publishrideRoute.get("/user_rides", async (req, res) => {
  const userEmail = req.header("userEmail");
  try {
    const publishrideResponse = await PublishRide.find();
    const userRides = publishrideResponse.filter(ride => ride.email === userEmail);
    res.json(userRides);
  } catch (err) {
    console.log(err);
  }
});

// Getting user Search rides
publishrideRoute.get('/search_rides', async (req, res) => {
  const { goingFrom, goingTo } = req.body;
  try {
    const publishrides = await PublishRide.find();
    const searchRides = publishrides.filter(ride => ride.goingfrom === goingFrom && ride.goingto === goingTo);
    res.json(searchRides);
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
      status: req.body.status,
      passenger: req.body.passenger,
      ridePublisherId: req.body.ridePublisherId,
      date: req.body.date,
    });
    res.send(
      `Your ride from ${publishride.goingfrom} to ${publishride.goingto} has been published...`
    );
  } catch (error) {
    console.log(error);
  }
});
publishrideRoute.patch("/:id", async (req, res) => {
  try {
    const updatedRide = await PublishRide.updateOne(
      { _id: req.params.id },
      {
        $set: {
          status: "Active",
          passenger: req.body.passenger,
        },
      }
    );
    res.send(`The Ride has approved by admin and has been Active from now...`);
  } catch (err) {
    res.send(err);
  }
});

publishrideRoute.delete("/:id", async (req, res) => {
  try {
    const deleteRide = await PublishRide.findByIdAndDelete(req.params.id);
    res.send(`The Ride Request has Cancelled and has been Deleted by Admin...`);
  } catch (err) {
    res.send(err);
  }
});
publishrideRoute.delete("/", (req, res) => {
  res.send("we are at publishride route with delete request");
});

module.exports = publishrideRoute;
