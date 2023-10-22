const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");

const { connectDB } = require("./connection");
// const URL = require("./Model/url");

const userRouter = require("./Routes/userRouter");
const urlRouter = require("./Routes/url");
const staticRouter = require("./Routes/staticRouter");
const { restrictToLoggedInUserOnly,checkAuth } = require("./Middleware/auth");

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
app.use(cookieParser());

//Routes
app.use("/url", restrictToLoggedInUserOnly, urlRouter);
app.use("/user", userRouter);
//View Routes
app.use("/", checkAuth, staticRouter);

app.listen(PORT, () => console.log(`Server Started at PORT ${PORT}`));
