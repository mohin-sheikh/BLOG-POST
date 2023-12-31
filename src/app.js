const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
require("dotenv").config();
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const mongoose = require("mongoose");
const app = express();

app.use(fileUpload({ createParentPath: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));


mongoose["connect"](process.env.MONGO_URL);
mongoose.connection.on('open', () => {
  console.log('Database is Connected');
});

const routes = require('./routes');
app.get('/', (req, res) => {
  res.send({ message: 'Welcome To Blog-Post Application' });
})
routes(app);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res) {
  // set locals, only providing error in development
  res["locals"].message = err["message"];
  res["locals"].error = req.app.get("env") === "development" ? err : {};
  res["status"](err["status"] || 500);
  res["render"]("error");
});

const port = process.env.PORT || 3000;
const host = process.env.HOST || "0.0.0.0";
app.listen(port, host, function () {
  console.log(`Server started at http://localhost:${process.env.PORT}`);
});
