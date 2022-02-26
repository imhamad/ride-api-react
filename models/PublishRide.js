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
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  passenger: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("PublishRide", publishRideSchema);
