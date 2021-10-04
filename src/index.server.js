const express = require("express");
const env = require("dotenv");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
//Routes
const authRoutes = require("./routes/auth");
env.config();

//Database Connection

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.5zrww.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //userCreateIndex: true,
  })
  .then(() => {
    console.log("Database Connected");
  });
app.use("/api", authRoutes);
//Server Listening
app.listen(process.env.PORT, () => {
  console.log("Server is running");
});
