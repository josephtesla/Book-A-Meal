import React, { useState } from 'react'
import "./index.css"
import { connect } from 'react-redux';
import Modal from '../../components/PopupModal';

const mapStateToProps = ({ orders, auth }) => ({
  orders: orders.orders,
  user: auth.user
})


const UserOrders = ({ orders, user }) => {

  const [ConfirmModal, setConfirmModal] = useState(false);

  //Grab Orders by User
  const userOrders = orders.filter(order => order.user._id === user._id);
  console.log(userOrders);

  const userOrdersByDate = {};

  //Divide User Orders in sections By their date
  userOrders.forEach((order) => {
    const localeDate = new Date(order.datePlaced).toDateString();

    if (Object.keys(userOrdersByDate).includes(localeDate)) {
      userOrdersByDate[localeDate] = [...userOrdersByDate[localeDate], order]
    }
    else {
      userOrdersByDate[localeDate] = [order];
    }
  });

  const hideConfirmModal = () => {
    setConfirmModal(false);
  };

  const handleConfirmClick = () => {
    setConfirmModal(true);
  }

  const handleConfirm = () => {
    
  }

  return (
    <div>

      <Modal show={ConfirmModal} handleClose={hideConfirmModal}>
        <h3>
          Confirm Order Delivery?
        </h3>
        <div className="modal-bottom">
          <button className="modal-yes-btn" onClick={handleConfirm}>Yes</button>
          <button className="modal-close-btn" onClick={hideConfirmModal}>No</button>
        </div>
      </Modal>

      <div className="main-container">
        <main>
          <div className="section-heading" >
            <span>All Your Orders</span>
          </div>

          {Object.keys(userOrdersByDate).map((date, i) => (
            <div key={i}>
              <div className="orders-day" >
                <h3>{date}</h3>
              </div>
              <div className="content row">
                {userOrdersByDate[date].map(order => (
                  <div className="col-3" key={order._id}>
                    <div className="action-card">
                      <h2>{order.option.title}</h2>
                      <small>Date placed: <b>{new Date(order.datePlaced).toLocaleString()}</b></small> <br></br>
                      <small>Order ID: {order._id}</small>
                      <small>Quantity: {order.quantity}</small>
                      <small>Cost: <b>N{order.quantity * order.option.price}</b>
                       &nbsp; Status: <b>{order.orderStatus}</b></small>
                      <div className="btnss">
                        <a className="btn modify-btn" onClick={() => handleConfirmClick(order._id)}>Confirm</a>
                        <a className="btn delete-btn">delete</a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </main>
      </div>
    </div>
  )
}


export default connect(mapStateToProps)(UserOrders);