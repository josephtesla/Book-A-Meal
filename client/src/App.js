import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Menu from "./containers/Menu";
import AdminDashboard from "./containers/AdminDashboard";
import ManageMeals from "./containers/ManageMeals";
import MealCheckout from "./containers/MealCheckout";
import OrderHistory from "./containers/OrderHistory";
import SignIn from "./containers/SignIn";
import SignUp from "./containers/SignUp";
import UserOrders from "./containers/UserOrders";
import MenuSetup from "./containers/MenuSetup";
import { fetchMealsAction } from './actions/meals';
import { connect } from 'react-redux';
import { fetchMenuAction } from './actions/menu';
import { fetchOrdersAction } from './actions/orders';
import AdminRoute from "./utils/PrivateRoutes/AdminRoute";
import CustomerRoute from "./utils/PrivateRoutes/CustomerRoute";
import CatererSignUp from './containers/CatererSignUp';

const mapDispatchToProps = dispatch => ({
  fetchMeals: () => dispatch(fetchMealsAction()),
  fetchMenu: () => dispatch(fetchMenuAction()),
  fetchOrders: () => dispatch(fetchOrdersAction())
})

const mapStateToProps = ({ auth }) => ({
  isAuthenticated: auth.isAuthenticated
})

const App = ({ fetchMeals, fetchOrders, isAuthenticated, fetchMenu }) => {

  useEffect(() => {
    fetchMenu();
  }, [])

  useEffect(() =>  {
    if (isAuthenticated){
      fetchMeals();
      fetchOrders();
    }
  }, [isAuthenticated])

  return (
    <Router>
      <Navigation />
      <Switch>
        <Route exact path="/"  component={Menu} />
        <Route exact path="/signin"  component={SignIn} />
        <Route exact path="/signup"  component={SignUp} />
        <Route exact path="/caterer/signup"  component={CatererSignUp} />

        <CustomerRoute exact path="/checkout/:mealId">
          <MealCheckout />
        </CustomerRoute>
        <CustomerRoute exact path="/customer/orders">
          <UserOrders />
        </CustomerRoute>

        <AdminRoute exact path="/admin/managemeals" >
          <ManageMeals />
        </AdminRoute>
        <AdminRoute exact path="/admin/dashboard" >
          <AdminDashboard />
        </AdminRoute>
        <AdminRoute exact path="/admin/orders">
          <OrderHistory />
        </AdminRoute>
        <AdminRoute exact path="/admin/setupmenu" >
          <MenuSetup />
        </AdminRoute>


      </Switch>
      <Footer />
    </Router>
  )
}


export default connect(mapStateToProps, mapDispatchToProps)(App);
