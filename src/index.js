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
app.use(bodyParser.urlencoded({extended: false}));

app.use("/", Routes)

app.get("*", (req, res) => {
  return res
  .status(200)
  .json({ 
    name: "aculite",
    description: "3444"
  })
})

export default app;