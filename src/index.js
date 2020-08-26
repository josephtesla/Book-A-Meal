import express from "express";
import logger from 'morgan';
import bodyParser from "body-parser";
import connectDB from "./utils/db.config";


import Routes from './routes';


require("dotenv").config();
connectDB(process.env.NODE_ENV);

const app = express();

app.use(logger("dev"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api/v1", Routes)

app.use((req, res, next) => {
  const error = new Error("Route not found");
  error.status = 404;
  next(error);
});

// error handler middleware
app.use((error, req, res, next) => {
  res.status(error.status || 500).send({
    error: {
      status: error.status || 500,
      message: error.message || "Internal Server Error"
    },
  });
});


export default app;