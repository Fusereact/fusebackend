const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const morgan = require("morgan");
var multer = require("multer");
var cors = require("cors");

const usersRoutes = require("./Routes/User-routes");
const calendarRoutes = require("./Routes/Calendar-router");

const noteRoutes = require("./Routes/Note-router");
const todoRoutes = require("./Routes/Todo-router");
const HttpError = require("./model/http-error");

mongoose
  .connect(
    "mongodb+srv://JackCrm:Jackcrm123@cluster0.ios0u.mongodb.net/CRM?retryWrites=true&w=majority",
    //"mongodb+srv://uzairkhan:uzairkhan123@cluster0.7b2zl.mongodb.net/FUSE_REACT?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    }
  )
  .then(() => {
    console.log("db connected");
  })
  .catch((err) => {
    console.log("error", err.message);
  });

//mongoose.set("useFindAndModify", true);
//mongoose.set("useFindAndDelete", true);

const app = express();

app.use(bodyParser.json());

app.use(morgan("dev"));
// to handel CORS ERROR

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requseted-With, Content-Type, Accept , Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");

  next();
});

// app.use("/" , (req , res) => {
//   res.send("Hello sir")
// })

app.use("/api/users", usersRoutes);
app.use("/api/calendar", calendarRoutes);
app.use("/api/note", noteRoutes);
app.use("/api/todo", todoRoutes);
app.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404);
  throw error;
});

var port = process.env.PORT || 5002;

app.listen(port, function () {
  console.log(`Listening on Port ${port}`);
});

// app.listen(process.env.PORT||5001);
