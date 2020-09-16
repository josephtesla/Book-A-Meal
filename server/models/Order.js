import mongoose from 'mongoose';

const orderSchema = mongoose.Schema({

  option: {
    type: Object,
    default: null
  },

  address: {
    type: String,
    default: ""
  },

  quantity: {
    type: Number,
    default: 1
  },
  
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  orderStatus: {
    type: String,
    default: "placed" //placed, transit, delivered
  },

  datePlaced: {
    type: Date,
    default: Date.now()
  },

  caterer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }

})

export default mongoose.model("Order", orderSchema);