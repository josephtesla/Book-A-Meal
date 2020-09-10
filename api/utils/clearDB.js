import Option from "../models/Option";
import Menu from "../models/Menu";
import Order from "../models/Order";


const clearDB = async  () => {
  await Option.deleteMany({});
  await Menu.deleteMany({});
  await Order.deleteMany({});
  console.log("cleared")
}

export default clearDB;