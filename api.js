const express = require("express");
const publishrideRoute = require("./routes/publishride");
const app = express();
const PORT = process.env.PORT || 3001;
const mongoose = require("mongoose");
const userRoute = require("./routes/user");
require("dotenv/config");
const cors = require("cors");

app.use(cors()); // to allow cross origin resource sharing
app.use(express.json()); // body parser

// to use routes
app.use("/publishride", publishrideRoute);
app.use("/user", userRoute);

// Connect to the Mongo DB
mongoose.connect(process.env.DB_CONNECTION, () => {
  console.log("Connected to the Database!");
});
// app listening on port: 3001
app.listen(PORT, () => console.log("Api running on :" + PORT));
