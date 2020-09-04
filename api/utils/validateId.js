import mongoose from "mongoose";


const validateId = async (model, res, id) => {
  if (!mongoose.Types.ObjectId.isValid(id)){
    //invalid id
    return res.status(400).json({
      error: "Invalid Id",
      status: 400
    })
  }

  const exists = (await model.find({_id: id})).length;
  if (!exists){
    return res.status(404).json({
      error: "Id does not exist!",
      status: 404
    })
  }
}

export default validateId;