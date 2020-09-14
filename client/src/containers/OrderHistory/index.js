import React, { useState } from 'react'
import "./index.css"
import { connect } from 'react-redux';
import Modal from '../../components/PopupModal';
import OrderFullDetailsModal from '../../components/OrderFullDetailsModal';
import Loader from "react-loader-spinner";
import { useHistory } from 'react-router-dom';
import {
  updateOrdersAction,
  fetchOrdersAction
} from '../../actions/orders';

const mapStateToProps = ({ orders, auth }) => ({
  orders: orders.orders,
  user: auth.user,
  ordersLoading: orders.loading

})

const mapDispatchToProps = (dispatch) => ({
  updateOrder: (orderId, updates) => dispatch(updateOrdersAction(orderId, updates)),
  fetchOrders: () => dispatch(fetchOrdersAction())
})


const OrderHistory = ({ orders, ordersLoading, updateOrder, fetchOrders }) => {

  const history = useHistory();

  const [orderModal, setOrderModal] = useState(false);
  const [clickedOrder, setClickedOrder] = useState({});

  const userOrdersByDate = {};

  //Divide User Orders in sections By their date
  const sortedOrders = [...orders];
  sortedOrders.reverse().forEach((order) => {
    const localeDate = new Date(order.datePlaced).toDateString();

    if (Object.keys(userOrdersByDate).includes(localeDate)) {
      userOrdersByDate[localeDate] = [...userOrdersByDate[localeDate], order]
    }
    else {
      userOrdersByDate[localeDate] = [order];
    }
  });


  const getAmountMade = (orders) => {
    return orders.reduce((amount, order) =>  amount + (order.quantity * order.option.price), 0)
  }


  const hideOrderModal = () => {
    setOrderModal(false);
  };

  const handleOrderClick = (order) => {
    setClickedOrder(order);
    setOrderModal(true);
  }


  return (
    <div>
      <Modal show={orderModal} handleClose={hideOrderModal} headerTitle="ORDER DETAILS">
        <OrderFullDetailsModal order={clickedOrder} />
        <div className="modal-bottom">
          <button className="modal-close-btn" onClick={hideOrderModal}>Close</button>
        </div>
      </Modal>

      <div className="main-container">
        <main>
          <div className="section-heading" >
            <span>Order History</span>
          </div>

          {!ordersLoading ? sortedOrders.length ? Object.keys(userOrdersByDate).map((date, i) => (
            <div key={i}>
              <div className="orders-day" >
                <h3>{date}</h3>
              </div>
              <h4>Amount made: {getAmountMade(userOrdersByDate[date])}</h4>
              <div className="content row">
                {userOrdersByDate[date].map(order => (
                  <div className="col-3" key={order._id}>
                    <div className="action-card">
                      <h2>{order.option.title}</h2>
                      <small><b>{new Date(order.datePlaced).toLocaleString()}</b></small> <br></br>
                      <small>Order ID: {order._id}</small>
                      <small>Quantity: {order.quantity}</small>
                      <small>Cost: <b>N{order.quantity * order.option.price}</b>
                       &nbsp; </small>
                      <small>Status: <b>{order.orderStatus}</b></small>
                      <div className="btnss">
                        <a className="btn modify-btn" onClick={() => handleOrderClick(order)}>Full details</a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )) : <h2 style={{ textAlign: "center", color: "grey" }}>Order History Is Empty!</h2>
            : <div style={{ display: "flex", justifyContent: "center" }}>
              <Loader
                type="Audio"
                color="green"
                height={100}
                width={100}
              />
            </div>}
        </main>
      </div>
    </div>
  )
}


export default connect(mapStateToProps, mapDispatchToProps)(OrderHistory);