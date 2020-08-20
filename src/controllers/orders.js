import Order from "../models/Order";
import Option from "../models/Option";
import User from "../models/User";


export const orderMealOption = async (req, res) => {
  const { userId } = req.params;
  const { mealOptionId } = req.body;

  //verify meal option id later

  const resp = await Order.create({user: userId, option: mealOptionId});
  const option = await Option.findOne({_id: mealOptionId});
  const user = await User.findOne({_id: userId});
  option.orders.push(resp._id);
  user.orders.push(resp._id);
  await option.save();
  await user.save();

  return res.status(201).json({status: 201, resp, message:"Order placed successfully!" })
}


export const modifyOrderOption = async (req, res) => {
  const orderId = req.params.orderId;
  const updates = req.body;
  try {
    const resp = await Order.updateOne({ _id: orderId }, updates).exec();
    const data = await Option.findById(orderId);
    return res.status(200).json({
      status: 200,
      resp,
      data,
      message: "Meal Order updated successfully"
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 500, error: "Internal Server Error!" })
  }
}


export const removeOrderOption = async (req, res) => {

  const { orderId, userId} = req.params;
  const data = await Order.find({ _id: orderId }).populate("user");
  if (data.length === 0) {
    return res.status(404).json({ status: 404, error: "Order does not exist already!" })
  } else if (`${data[0].user._id}` !== userId){
    console.log(data[0].user._id, userId)
    return res.status(401).json({ status: 401, error: "This user cannot delete this order!" })
  }

  try {
    const resp = await Order.deleteOne({ _id: orderId });
    return res.status(200).json({
      status: 200,
      resp,
      data,
      message: "Order deleted successfully"
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 500, error: "Internal Server Error!" })
  }
}



export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("user").populate("option");
    res.status(200).json({ status: 200, data: orders })
  } catch (ServerError) {
    console.log(ServerError);
    res.status(500).json({ status: 500, error: "Internal Server Error!" })
  }
}

// Order.deleteMany({})
// .then(resp => {
//   console.log("deleted")
// })

// const start = new Date();
// start.setHours(0, 0, 0, 0);

// const end = new Date();
// end.setHours(23, 59, 59, 999);

// console.log(start.getTime())
// console.log(end.getTime())