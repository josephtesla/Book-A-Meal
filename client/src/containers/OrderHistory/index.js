import React from 'react'
import "./index.css"

export default function OrderHistory() {
  return (
    <div>
      <div className="main-container">
        <main>
          <div className="section-heading" >
            <span>All Order History</span>
          </div>
          <div className="orders-day">
            <h3>Thursday, 19 June 2020</h3>
          </div>
          <h3>Total Amount Made: $175,000</h3><br></br>
          <div className="content row">
            <div className="col-3">
              <div className="action-card">
                <h2>Egg and Beef Sauce</h2>
                <small>Date placed: 29 Aug 2020 10:42pm</small> <br></br>

                <small>Order ID: 554839H5BI3I3I3J3UHI3</small>
                <small>Cost: <b>$500</b> &nbsp;</small>
                <small> Status: <b>Delivered</b></small>
                <div className="btnss">
                  <a className="btn modify-btn">View full details</a>
                </div>
              </div>
            </div>
            <div className="col-3">
              <div className="action-card">
                <h2>Egg and Beef Sauce</h2>
                <small>Date placed: 29 Aug 2020 10:42pm</small> <br></br>
                <small>Customer: Akinsola Michael (1D:554839H5BI3I3I3J3UHI3) </small> <br></br>

                <small>Order ID: 554839H5BI3I3I3J3UHI3</small>
                <small>Quantity: 2 places</small>
                <small>Cost: <b>$500</b> &nbsp;</small>
                <small> Status: <b>Delivered</b></small>
                <div className="btnss">
                  <a className="btn modify-btn">View full details</a>
                </div>
              </div>
            </div>
          </div>

          <div className="orders-day">
            <h3>Thursday, 19 June 2020</h3>
          </div>
          <h3>Total Amount Made: $12,000</h3><br></br>
          <div className="content row">
            <div className="col-3">
              <div className="action-card">
                <h2>Egg and Beef Sauce</h2>
                <small>Date placed: 29 Aug 2020 10:42pm</small> <br></br>
                <small>Order ID: 554839H5BI3I3I3J3UHI3</small>
                <small>Quantity: 2 places</small>
                <small>Cost: <b>$500</b> &nbsp; Status: <b>Delivered</b></small>

              </div>
            </div>
            <div className="col-3">
              <div className="action-card">
                <h2>Egg and Beef Sauce</h2>
                <small>Date placed: 29 Aug 2020 10:42pm</small> <br></br>
                <small>Order ID: 554839H5BI3I3I3J3UHI3</small>
                <small>Quantity: 2 places</small>
                <small>Cost: <b>$500</b> &nbsp; Status: <b>Delivered</b></small>

              </div>
            </div>
            <div className="col-3">
              <div className="action-card">
                <h2>Egg and Beef Sauce</h2>
                <small>Date placed: 29 Aug 2020 10:42pm</small> <br></br>
                <small>Order ID: 554839H5BI3I3I3J3UHI3</small>
                <small>Quantity: 2 places</small>
                <small>Cost: <b>$500</b> &nbsp; Status: <b>Delivered</b> </small>

              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
