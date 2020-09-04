import React from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Menu from "./containers/Menu";
import AdminDashboard from "./containers/AdminDashboard";
import AdminSignIn from "./containers/AdminSignIn";
import ManageMeals from "./containers/ManageMeals";
import MealCheckout from "./containers/MealCheckout";
import OrderHistory from "./containers/OrderHistory";
import SignIn from "./containers/SignIn";
import SignUp from "./containers/SignUp";
import UserOrders from "./containers/UserOrders";
import MenuSetup from "./containers/MenuSetup";


const App = () => {
  return (
    <Router>
      <Navigation />
      <Switch>
        <Route exact path="/"  component={Menu} />
        <Route exact path="/signin"  component={SignIn} />
        <Route exact path="/signup"  component={SignUp} />
        <Route exact path="/checkout/:mealId"  component={MealCheckout} />
        <Route exact path="/admin/managemeals"  component={ManageMeals} />
        <Route exact path="/customer/orders"  component={UserOrders} />
        <Route exact path="/admin/signin"  component={AdminSignIn} />
        <Route exact path="/admin/dashboard"  component={AdminDashboard} />
        <Route exact path="/admin/orders"  component={OrderHistory} />
        <Route exact path="/admin/setupmenu"  component={MenuSetup} />
      </Switch>
      <Footer />
    </Router>
  )
}


export default App;
