import React, { useState } from 'react'
import "./index.css"
import { useRouteMatch, useHistory } from 'react-router-dom'
import { connect } from 'react-redux';
import { addOrdersAction } from '../../actions/orders';
import { ToastContainer, toast } from "react-toastify";


const mapStateToProps = ({ meals }) => ({
  meals: meals.meals
})

const mapDispatchToProps = (dispatch) => ({
  addNewOrder: (data) => dispatch(addOrdersAction(data)),
}) 

const MealCheckout = ({ meals, addNewOrder }) => {

  const history = useHistory();
  const { params } = useRouteMatch();
  const [state, setState] = useState({
    quantity: "",
    address: ""
  })
  const { mealId } = params;

  //extract mealoption from meals.

  let mealOption = {}
  if (meals.length) {
    mealOption = meals.filter(meal => meal._id === mealId)[0];
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState(state => ({...state, [name]: value}))
  }

  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    const data = {
      mealOptionId: mealOption._id,
      quantity: Number(state.quantity),
      address: state.address
    }

    const resp = await addNewOrder(data);
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
          {meals.length ?
            <div className="order-checkout-page row">
              <div className="order-image col-2">
                <img src={mealOption.imageUrl} alt="order" />
              </div>
              <div className="order-details col-2" >
                <h1>{mealOption.title}</h1>
                <hr></hr>
                <p>Price: <span className="price-tag">N{mealOption.price}</span></p>
                <p><b>Meal Description</b>: {mealOption.description} </p>
                <form onSubmit={handleOrderSubmit}>
                <input
                    type="text"
                    name="address"
                    className="form-input"
                    placeholder="Delivery Address"
                    required
                    onChange={handleChange}
                    value={state.address}
                  /> <br></br><br></br>
                  <input
                    type="number"
                    name="quantity"
                    className="form-input"
                    placeholder="Enter Quantity"
                    min="1"
                    required
                    value={state.quantity}
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