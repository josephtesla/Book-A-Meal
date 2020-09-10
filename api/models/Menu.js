import mongoose from "mongoose";

const menuSchema = mongoose.Schema({

  dateSet: {
    type: Date,
    default: Date.now()
  },

  timeExpires: {
    type: Number,
    required: true
  },

  options: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Option"
  }]
})

export default mongoose.model("Menu", menuSchema)