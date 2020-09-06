import React, { useState } from 'react'
import foodImage from '../../assets/images/food-3.jpg'
import "./index.css"
import { useRouteMatch, useHistory } from 'react-router-dom'
import { connect } from 'react-redux';
import { addOrdersAction } from '../../actions/orders';
import { ToastContainer, toast } from "react-toastify";


const mapStateToProps = ({ menu }) => ({
  menu: menu.menu
})

const mapDispatchToProps = (dispatch) => ({
  addMealOption: (data) => dispatch(addOrdersAction(data)),
}) 

const MealCheckout = ({ menu, addMealOption }) => {

  const history = useHistory();
  const { params } = useRouteMatch();
  const [state, setState] = useState({
    quantity: ""
  })
  const { mealId } = params;

  //extract mealoption from menu.

  let mealOption = {}
  if (menu.length) {
    mealOption = menu[0].options.filter(meal => meal._id == mealId)[0];
  }

  const handleChange = (e) => {
    setState({ quantity: e.target.value })
  }

  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    const data = {
      mealOptionId: mealOption._id,
      quantity: Number(state.quantity)
    }

    const resp = await addMealOption(data);
    if (!resp.error) {
      toast.success("Order placed successfully!", { autoClose: 4000 })
      setTimeout(() => {
        history.push("/customer/orders")
      }, 2000);
    } else {
      toast.success(resp.error, { autoClose: 4000 })
    }
  }

  return (
    <div>
      <ToastContainer />
      <div className="main-container">
        <main>
          <div className="section-heading">
            <span>Order Your Meal</span>
          </div>
          {menu.length ?
            <div className="order-checkout-page row">
              <div className="order-image col-2">
                <img src={foodImage} alt="order" />
              </div>
              <div className="order-details col-2" >
                <h1>{mealOption.title}</h1>
                <hr></hr>
                <p>Price: <span className="price-tag">N{mealOption.price}</span></p>
                <p><b>Meal Description</b>: {mealOption.description} </p>
                <form onSubmit={handleOrderSubmit}>
                  <input
                    type="number"
                    className="form-input"
                    placeholder="Enter Quantity"
                    min="1"
                    required
                    onChange={handleChange}
                  /> <br></br><br></br>
                  <p>Total Cost: <span className="price-tag">N{mealOption.price * Number(state.quantity)}</span></p>
                  <br></br>
                  <button className="btn place-btn">Place order &#8594;</button>
                </form>
              </div>
            </div> : ""
          }
        </main>
      </div>


    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(MealCheckout);