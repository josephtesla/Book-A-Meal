import Option from "../models/Option";
import Menu from "../models/Menu";
import Order from "../models/Order";
import User from "../models/User";

const clearDB = async () => {
  await Option.deleteMany({});
  await Menu.deleteMany({});
  await Order.deleteMany({});
  await User.deleteMany({});
  console.log("cleared")
}

export default clearDB;