import mongoose from "mongoose";

const optionSchema = mongoose.Schema({

  title: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: true
  },

  price: {
    type: Number,
    required: true
  },

  imageUrl: {
    type: String,
    default: "no_image_url"
  },

  orders: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order"
  }],

  menus: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Menu"
    }
  ]
  
})

export default mongoose.model("Option", optionSchema);