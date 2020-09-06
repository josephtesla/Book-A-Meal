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
  getAllOrders,
  getAllOrdersByUser
} from "./controllers/orders";

import {
  signIn,
  signUp,
  requireSignIn,
  adminMiddleware,
  accountActivation
} from "./controllers/auth";


import {
  userSigninValidator,
  userSignupValidator,
} from "./validators/auth";

import { runValidation } from "./validators"

//User Routes
router.get("/users", getUsers);
router.post("/users", createUser);


//Auth Routes
router.post("/signup",
  userSignupValidator,
  runValidation,
  signUp
);

router.get("/auth/activate/:token", accountActivation);

router.post("/signin",
  userSigninValidator,
  runValidation,
  signIn
);


//Meal Options Routes
router.get("/meals",
  requireSignIn,
  getAllMealOptions
);

router.post("/meals",
  requireSignIn,
  adminMiddleware,
  AddMealOption
);

router.put("/meals/:mealId",
  requireSignIn,
  adminMiddleware,
  updateMealOption
);

router.delete("/meals/:mealId",
  requireSignIn,
  adminMiddleware,
  removeMealOption
);

//Menu Routes
router.get("/menu",
  getMenu
);

router.post("/menu",
  requireSignIn,
  adminMiddleware,
  setupMenu
);

//Order Routes
router.get("/orders",
  requireSignIn,
  getAllOrders
);

router.get("/orders/customer",
  requireSignIn,
  getAllOrdersByUser
);

router.post("/orders",
  requireSignIn,
  orderMealOption
);

router.put("/orders/:orderId",
  requireSignIn,
  modifyOrderOption
);

router.delete("/orders/:orderId",
  requireSignIn,
  removeOrderOption
)


export default router;