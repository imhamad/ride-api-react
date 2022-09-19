const mongoose = require("mongoose");
const publishRideSchema = mongoose.Schema({
  goingfrom: {
    type: String,
    required: true,
  },
  goingto: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    // required: true,
  },
  email: {
    type: String,
    // required: true,
  },
  phone: {
    type: Number,
  },
  status: {
    type: String,
    required: true,
  },
  passenger: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    Dateformat: "dd/mm/yyyy",
    required: true,
  },
  ridePublisherId: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("PublishRide", publishRideSchema);
