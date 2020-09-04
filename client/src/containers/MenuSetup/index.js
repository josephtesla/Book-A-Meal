import React from 'react'
import foodImage from '../../assets/images/food-3.jpg'
import "./index.css";

const MenuSetup = () => {
  return (
    <div>
      <div className="main-container">
        <main>
          <div className="section-heading">
            <span>Today's Menu Setup</span>
          </div>
          <div className="menu-page row">
            <div className="menu-col-1 col-2">
              <h1>Today's menu has not been set yet! </h1>
            </div>
            <div className="order-details col-2" >
              <h2>Select from meal options</h2>
              <hr></hr>
              <div className="all-options-0">
                <div className="action-card-0">
                  <input type="checkbox" name="" id="" />
                  <img src={foodImage} width="50%" alt="" />

                  <div className="details-0">
                    <h3>Rice and Chicken Sauce</h3>
                    <small>Price: <b>$500</b> </small>
                  </div>

                </div>
                <div className="action-card-0">
                  <input type="checkbox" name="" id="" />
                  <img src={foodImage} width="50%" alt="" />

                  <div className="details-0">
                    <h3>Rice and Chicken Sauce</h3>
                    <small>Price: <b>$500</b> </small>
                  </div>

                </div>
                <div className="action-card-0">
                  <input type="checkbox" name="" id="" />
                  <img src={foodImage} width="50%" alt="" />

                  <div className="details-0">
                    <h3>Rice and Chicken Sauce</h3>
                    <small>Price: <b>$500</b> </small>
                  </div>

                </div>
                <div className="action-card-0">
                  <input type="checkbox" name="" id="" />
                  <img src={foodImage} width="50%" alt="" />

                  <div className="details-0">
                    <h3>Rice and Chicken Sauce</h3>
                    <small>Price: <b>$500</b> </small>
                  </div>

                </div>
                <div className="action-card-0">
                  <input type="checkbox" name="" id="" />
                  <img src={foodImage} width="50%" alt="" />

                  <div className="details-0">
                    <h3>Rice and Chicken Sauce</h3>
                    <small>Price: <b>$500</b> </small>
                  </div>
                </div>
              </div>
              <button className="btn place-btn-0">Finish Menu Setup &#8594;</button>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default MenuSetup;
