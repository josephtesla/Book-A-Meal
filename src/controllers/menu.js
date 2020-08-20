import Menu from "../models/Menu";
import Option from "../models/Option";

export const setupMenu = async (req, res) => {
  //menuList = Array of meal Options IDs
  const menuOptions = ["5f3ea5967d987b1182388527", "5f3db3ff3bb54f192d829fe5"]; //will change this to req.body
  menuOptions.forEach(async optionId => {
    try {
      const options = await Option.find({ _id: optionId });
      if (options.length === 0) {
        return res.json({
          error: "Incorrect Option Id found!"
        })
      }
    } catch (error) {
      return res.json({
        error: "Incorrect Option Id found!"
      })
    }
  })

  const endDate = new Date();
  endDate.setHours(23, 59, 59, 999);
  const endTime = endDate.getTime();
  const resp = await Menu.create({ options: menuOptions, timeExpires: endTime });
  const createdMenu = await Menu.findById(resp._id)

  return res.status(201).json({ status: 201, createdMenu, message: "Menu created successfully!" })
}



export const getMenu = async (req, res) => {
  try {
    const menu = await Menu.find().populate("options");
    const menuForTheDay = menu.filter(singleMenu => {
      return singleMenu.timeExpires > new Date().getTime();
    })
    return res.status(200).json({ status: 200, data: menuForTheDay })
  } catch (ServerError) {
    console.log(ServerError);
    return res.status(500).json({ status: 500, error: "Internal Server Error!" })
  }
}

// Menu.deleteMany({}).then(() => {
//   console.log("menu cleared!")
// })

