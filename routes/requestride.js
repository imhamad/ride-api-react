const express = require("express");
const requestRideRoute = express.Router();
const RequestRide = require("../models/RequestedRide");

// get request
requestRideRoute.get("/", async (req, res) => {
  try {
    const requestedRides = await RequestRide.find();
    res.json(requestedRides);
  } catch (err) {
    console.log(err);
  }
});

// post request
requestRideRoute.post("/", async (req, res) => {
  try {
    const requestRide = await RequestRide.create({
      goingfrom: req.body.goingfrom,
      goingto: req.body.goingto,
      passenger: req.body.passenger,
      rideStatus: req.body.rideStatus,
      bookingDate: req.body.ridedate,
      requestStatus: req.body.requestStatus,
      bookerEmail: req.body.bookerEmail,
      publisherId: req.body.publisherId,
      bookerId: req.body.bookerId,
      rideId: req.body.rideId,
      rejectionReason: req.body.rejectionReason,
    });
    res.send(
      `You booked Ride from ${requestRide.goingfrom} to ${requestRide.goingto} with ${requestRide.passenger} passenger, now you can message ride booker to confirm your ride.`
    );
    console.log(requestRide.bookingDate);
  } catch (error) {
    console.log(error);
  }
});

// patch request
requestRideRoute.patch("/:id", async (req, res) => {
  try {
    const updatedbookedRide = await RequestRide.updateOne(
      { _id: req.params.id },
      {
        $set: {
          requestStatus: req.body.requestStatus,
          rejectionReason: req.body.rejectionReason,
        },
      }
    );
    res.send(`The Ride has been Updated...`);
  } catch (err) {
    res.send(err);
  }
});

// delete request
requestRideRoute.delete("/", async (req, res) => {
  res.send("we are at requestride route with delete request");
});

module.exports = requestRideRoute;
