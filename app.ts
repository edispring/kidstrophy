import * as express from "express";
import * as path from "path";
import * as favicon from "serve-favicon";
import * as logger from "morgan";
import * as cookieParser from "cookie-parser";
import * as bodyParser from "body-parser";
import * as http from "http";
import * as Promise from "bluebird";

import mongoose = require("mongoose");

import { router } from "./router";
import { dbConnection } from "./config";
const serverless = require("serverless-http");

const app = express();

mongoose.connect(dbConnection).then(console.log).catch(console.error);
mongoose.Promise = Promise;

/**
 * Listen on provided port, on all network interfaces.
 */

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "public")));

router(app);

app.use("/.netlify/functions/server", router); // path must route to lambda

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err: any = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
module.exports.handler = serverless(app);
