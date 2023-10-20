const express = require("express");
const path = require("path");

const { connectDB } = require("./connection");
// const URL = require("./Model/url");
const urlRouter = require("./Routes/url");
const staticRouter = require("./Routes/staticRouter");

const PORT = 8000;
const app = express();

//MongoDB Connection
connectDB("mongodb://127.0.0.1:27017/URL-Shortner").then(() =>
  console.log("MongoDb Connected!")
);

app.set("view engine", "ejs");
app.set("views", path.resolve("./Views"));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Routes
app.use("/url", urlRouter);
//View Routes
app.use("/", staticRouter);

app.listen(PORT, () => console.log(`Server Started at PORT ${PORT}`));
