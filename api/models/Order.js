import mongoose from 'mongoose';

const orderSchema = mongoose.Schema({

  option: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Option"
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
  }

})

export default mongoose.model("Order", orderSchema)