import Menu from "../models/Menu";
import Option from "../models/Option";
import mongoose from "mongoose";

export const setupMenu = async (req, res) => {
  const { menuOptions } = req.body;

  for (let i = 0; i < menuOptions.length; i++) {
    const optionId = menuOptions[i];
    try {
      if (!mongoose.Types.ObjectId.isValid(optionId)) {
        //invalid id
        return res.status(400).json({
          error: "Invalid Option Id : " + optionId,
          status: 400
        })
      }
      const options = await Option.find({ _id: optionId });
      if (options.length === 0) {
        return res.status(404).json({
          error: "Option Id " + optionId + " Does not exists"
        })
      }
    } catch (error) {
      return res.json({
        error: "Incorrect Option Id found!"
      })
    }

  }

  const endDate = new Date();
  endDate.setHours(23, 59, 59, 999);
  const endTime = endDate.getTime();

  //Overwrite previous meal data for the day
  await Menu.deleteMany({caterer: req.user._id, timeExpires: endTime});

  const resp = await Menu.create({caterer: req.user._id, options: menuOptions, timeExpires: endTime });
  const data = await Menu.findById(resp._id).populate("options");
  return res.status(201).json({ status: 201, data, message: "Menu created successfully!" })
}



export const getMenu = async (req, res) => {
  try {
    const menu = await Menu.find({}).populate("options").populate("caterer")
    const menuForTheDay = menu.filter(singleMenu => {
      return singleMenu.timeExpires > new Date().getTime();
    })
    console.log(menuForTheDay)
    return res.status(200).json({ status: 200, data: menuForTheDay })
  } catch (ServerError) {
    console.log(ServerError);
    return res.status(500).json({ status: 500, error: "Internal Server Error!" })
  }
}


// Menu.deleteMany({}).then(() => {
//   console.log("menu cleared!")
// })