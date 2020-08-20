import { config } from "dotenv";
import mongoose from 'mongoose';

config();

const connectDB = (NODE_ENV) => {

  let MONGODB_URI = process.env.MONGODB_URI_PROD;

  if (NODE_ENV === "development"){
    MONGODB_URI = "mongodb://127.0.0.1:27017";
  } else if (NODE_ENV === "test"){
    MONGODB_URI = process.env.MONGODB_URI_TEST
  }
    mongoose
      .connect(MONGODB_URI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
      }).then(() => {
        console.log("MongoDB database connected! :" + MONGODB_URI)
      }).catch(error => console.log(error.message))

}

export default connectDB;