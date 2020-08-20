import express from "express";
const router = express.Router();

import {
  createUser,
  getUsers
} from "./controllers/users";


import {
  getAllMealOptions, 
  AddMealOption,
  updateMealOption,
  removeMealOption
} from "./controllers/meals";

import {
  getMenu, 
  setupMenu
} from "./controllers/menu"

import {
  orderMealOption,
  removeOrderOption,
  modifyOrderOption,
  getAllOrders
} from "./controllers/orders";


//User Routes
router.get("/users", getUsers);
router.post("/users", createUser);

//Meal Options Routes
router.get("/meals", getAllMealOptions);
router.post("/meals", AddMealOption);
router.put("/meals/:mealId", updateMealOption);
router.delete("/meals/:mealId", removeMealOption);

//Menu Routes
router.get("/menu", getMenu);
router.post("/menu", setupMenu);

//Order Routes
router.get("/orders", getAllOrders);
router.post("/orders/:userId", orderMealOption);
router.put("/orders/:orderId", modifyOrderOption);
router.delete("/orders/:orderId/:userId", removeOrderOption)


export default router;