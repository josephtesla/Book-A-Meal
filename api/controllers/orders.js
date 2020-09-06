import Order from "../models/Order";
import Option from "../models/Option";
import User from "../models/User";
import validateId from "../utils/validateId"
import Menu from "../models/Menu";


export const orderMealOption = async (req, res) => {
  const userId = req.user._id;
  const { mealOptionId, quantity } = req.body;

  //verify meal option ID
  const menu = await Menu.find({}).populate("options");
  const menuForTheDay = menu.filter(singleMenu => {
    return singleMenu.timeExpires > new Date().getTime();
  })

  const data = await Order.create({user: userId, option: mealOptionId, quantity});
  const option = await Option.findOne({_id: mealOptionId});
  const user = await User.findOne({_id: userId});
  option.orders.push(data._id);
  user.orders.push(data._id);
  await option.save();
  await user.save();

  const cost = Number(option.price) * quantity;

  return res.status(201).json({status: 201, data, message:"Order placed successfully!", cost})
}


export const modifyOrderOption = async (req, res) => {
  const userId = req.user._id;
  const orderId = req.params.orderId;
  const updates = req.body;

  const result = await validateId(Order, res, orderId);
  if (result) return;

  const order =  await Order.findById(orderId);
  console.log(order.user, userId)
  if (order.user != userId){
    return res.status(401).json({ status: 401, error: "This user cannot modify this order!" })
  }

  try {
    const resp = await Order.updateOne({ _id: orderId }, updates).exec();
    const data = await Order.findById(orderId);
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
  const userId = req.user._id;
  const { orderId } = req.params;
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

export const getAllOrdersByUser = async (req, res) => {
  try {
    const orders = await Order.find({user: req.user._id}).populate("user").populate("option");
    res.status(200).json({ status: 200, data: orders })
  } catch (ServerError) {
    console.log(ServerError);
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