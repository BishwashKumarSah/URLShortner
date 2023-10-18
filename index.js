const express = require("express");

const { connectDB } = require("./connection");
// const URL = require("./Model/url");
const urlRouter = require("./Routes/url");

const PORT = 8000;
const app = express();

//MongoDB Connection
connectDB("mongodb://127.0.0.1:27017/URL-Shortner").then(() =>
  console.log("MongoDb Connected!")
);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Routes
app.use('/url',urlRouter);

app.listen(PORT, () => console.log(`Server Started at PORT ${PORT}`));
