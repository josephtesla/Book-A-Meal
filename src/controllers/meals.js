import Option from "../models/Option";
import mongoose from "mongoose";
import User from "../models/User";
import validateId from "../utils/validateId"

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
      status: 201,
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
  
  const result = await validateId(Option, res, mealId);
  if (result){
    return
  }
  
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

  const result = await validateId(Option, res, mealId);
  if (result){
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

