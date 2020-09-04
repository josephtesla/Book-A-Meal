import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    max: 255
  },

  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
    lowercase: true
  },

  password: {
    type: String,
    required: true
  },

  role: {
    type: String,
    default: "customer"
  },

  dateRegistered: {
    type: Date,
    default: Date.now()
  },

  orders:[
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order"
    }
  ]
  
})

export default mongoose.model("User", userSchema);