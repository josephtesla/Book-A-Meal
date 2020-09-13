import Option from "../models/Option";
import validateId from "../utils/validateId"
import { uploads as uploadToCloud } from "../utils/cloudUpload";

export const getAllMealOptions = async (req, res) => {
  const { role, _id } = req.user;
  try {
    let mealOptions = (role === "customer") ?
    await Option.find():
    await Option.find({ caterer: _id});
    res.status(200).json({ status: 200, data: mealOptions })
    
  } catch (ServerError) {
    console.log(ServerError);
    res.status(500).json({ status: 500, error: "Internal Server Error!" })
  }
}

export const AddMealOption = async (req, res) => {
  //req.body = title, description, price, imageUrl
  const { _id } = req.user;
  try {
    const data = await Option.create({...req.body, caterer: _id});
    return res.status(201).json({
      status: 201,
      message: "Meal Option added successfully",
      data
    })
  } catch (error) {
    res.status(500).json({ status: 500, error: "Internal Server Error!" })
  }
}


export const processImage = async (req, res) => {
  if (req.file) {
    try {
      const resp = await uploadToCloud(req.file.path);
      return res.status(200).json(resp)
    } catch (error) {
      console.log(error)
      return res.status(500).json({ error: "Error processing image upload" })
    }
  }
}


export const updateMealOption = async (req, res) => {
  const mealId = req.params.mealId;
  const updates = req.body;

  const result = await validateId(Option, res, mealId);
  if (result) {
    return
  }

  try {
    const resp = await Option.updateOne({ _id: mealId }, updates).exec();
    const data = await Option.find({});
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

  const result = await validateId(Option, res, mealId);
  if (result) {
    return
  }

  try {
    const data = await Option.findById(mealId);
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


