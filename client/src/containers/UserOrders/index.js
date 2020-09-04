import React from 'react'
import "./index.css"

export default function UserOrders() {
  return (
    <div>

      <div className="main-container">
        <main>
          <div className="section-heading" >
            <span>All Your Orders</span>
          </div>

          <div className="orders-day">
            <h3>Thursday, 19 June 2020</h3>
          </div>
          <div className="content row">
            <div className="col-3">
              <div className="action-card">
                <h2>Egg and Beef Sauce</h2>
                <small>Date placed: 29 Aug 2020 10:42pm</small> <br></br>
                <small>Order ID: 554839H5BI3I3I3J3UHI3</small>
                <small>Quantity: 2 places</small>
                <small>Cost: <b>$500</b> &nbsp; Status: <b>Delivered</b></small>
                <div className="btnss">
                  <a className="btn modify-btn">Modify</a>
                  <a className="btn delete-btn">delete</a>
                </div>
              </div>
            </div>
            <div className="col-3">
              <div className="action-card">
                <h2>Egg and Beef Sauce</h2>
                <small>Date placed: 29 Aug 2020 10:42pm</small> <br></br>
                <small>Order ID: 554839H5BI3I3I3J3UHI3</small>
                <small>Quantity: 2 places</small>
                <small>Cost: <b>$500</b> &nbsp; Status: <b>Delivered</b></small>
                <div className="btnss">
                  <a className="btn modify-btn">Modify</a>
                  <a className="btn delete-btn">delete</a>
                </div>
              </div>
            </div>
          </div>

          <div className="orders-day">
            <h3>Thursday, 19 June 2020</h3>
          </div>
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


      <footer className="copyright">
        <div>
          Copyright 2020. developed by <a href="http://github.com/josephtesla" target="_blank"
            rel="noopener noreferrer">@Josephtesla</a>
        </div>
      </footer>
    </div>
  )
}
