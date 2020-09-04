import React from 'react'
import "./index.css"


export default function MealCheckout() {
  return (
    <div>
      <div className="main-container">
        <main>
          <div className="section-heading">
            <span>Order Your Meal</span>
          </div>
          <div className="order-checkout-page row">
            <div className="order-image col-2">
              <img src="images/food-3.jpg" alt="order" />
            </div>
            <div className="order-details col-2" >
              <h1>Egg and Spiced Beef Sauce</h1>
              <hr></hr>
              <p>Price: <span className="price-tag">$1499.99</span></p>
              <p><b>Meal Description</b>: Lorem ipsum dolor sit amet consectetur adipisicing elit.
               Laboriosam provident molestias earum odio, veniam atque voluptas enim veritatis quia,
                esse ducimus rem labore saepe doloribus animi commodi voluptatum porro soluta?</p>
              <input type="number" className="form-input" placeholder="Enter Quantity" />
              <p>Total Cost: <span className="price-tag">$7500</span></p>
              <button className="btn place-btn">Place order &#8594;</button>
            </div>
          </div>
        </main>
      </div>


    </div>
  )
}
