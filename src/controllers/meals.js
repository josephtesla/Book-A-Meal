import Option from "../models/Option";

export const getAllMealOptions = async (req, res) => {
  try {
    const mealOptions = await Option.find().exec();
    res.status(200).json({ status: 200, data: mealOptions })
  } catch (ServerError) {
    console.log(ServerError);
    res.status(500).json({ status: 500, error: "Internal Server Error!" })
  }
}

export const AddMealOption = async (req, res) => {
  //req.body = title, description, price, imageUrl
  try {
    const data = await Option.create(req.body);
    return res.status(201).json({
      status: 200,
      message: "Meal Option added successfully",
      data
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 500, error: "Internal Server Error!" })
  }
}



export const updateMealOption = async (req, res) => {
  const mealId = req.params.mealId;
  const updates = req.body;

  try {
    const resp = await Option.updateOne({ _id: mealId }, updates).exec();
    const data = await Option.findById(mealId);
    return res.status(200).json({
      status: 200,
      resp,
      data,
      message: "Meal Option updated successfully"
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 500, error: "Internal Server Error!" })
  }
}



export const removeMealOption = async (req, res) => {
  const mealId = req.params.mealId;

  const data = await Option.find({ _id: mealId });
  if (data.length === 0) {
    return res.status(404).json({ status: 404, error: "Meal option does not exist already!" })
  }

  try {
    const resp = await Option.deleteOne({ _id: mealId });
    return res.status(200).json({
      status: 200,
      resp,
      data,
      message: "Meal Option deleted successfully"
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 500, error: "Internal Server Error!" })
  }
}

