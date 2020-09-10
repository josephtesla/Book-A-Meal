import React, { useState } from 'react'
import "./index.css"
import { connect } from 'react-redux';
import Modal from '../../components/PopupModal';
import {
  removeOrdersAction,
  updateOrdersAction,
  fetchOrdersAction
} from '../../actions/orders';
import { toast, ToastContainer } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import Loader from "react-loader-spinner";


const mapStateToProps = ({ orders, auth }) => ({
  orders: orders.orders,
  user: auth.user,
  ordersLoading: orders.loading
})


const mapDispatchToProps = (dispatch) => ({
  removeOrder: (orderId) => dispatch(removeOrdersAction(orderId)),
  updateOrder: (orderId, updates) => dispatch(updateOrdersAction(orderId, updates)),
  fetchOrders: () => dispatch(fetchOrdersAction())
})


const UserOrders = ({
  orders,
  user,
  updateOrder,
  fetchOrders,
  removeOrder,
  ordersLoading }) => {

  const history = useHistory();

  const [ConfirmModal, setConfirmModal] = useState(false);
  const [clickedOrder, setClickedOrder] = useState("");

  //Grab Orders by User
  const userOrders = orders.filter(order => order.user._id === user._id);
  console.log(userOrders);

  const userOrdersByDate = {};

  //Divide User Orders in sections by their dates
  const sortedOrders = [...userOrders];
  sortedOrders.reverse().forEach((order) => {
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

  const handleConfirmClick = (orderId) => {
    setClickedOrder(orderId);
    setConfirmModal(true);
  }

  const handleConfirm = async () => {
    const data = {
      orderStatus: "Delivered"
    }
    const resp = await updateOrder(clickedOrder, data);
    if (!resp.error) {
      toast.success('Confirmation Successful!', { autoClose: 4000 })
      fetchOrders();
      setTimeout(() => {
        history.push("/some-shii")
        history.push("/customer/orders")
      }, 2000);
    }
    else {
      toast.error(resp.error, { autoClose: 4000 })
    }
  }

  const handleOrderDelete = async (orderId) => {
    const resp = await removeOrder(orderId);
    if (!resp.error) {
      toast.success('Delete Successful!', { autoClose: 4000 })
      fetchOrders();
      setTimeout(() => {
        history.push("/some-shii")
        history.push("/customer/orders")
      }, 2000);
    }
    else {
      toast.error(resp.error, { autoClose: 4000 })
    }
  }

  return (
    <div>
      <ToastContainer />
      <Modal show={ConfirmModal} handleClose={hideConfirmModal} headerTitle="Orders">
        <h4>
          Confirm Delivery Of Order (ID: {clickedOrder})?
        </h4>
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

          {!ordersLoading ? sortedOrders.length ? Object.keys(userOrdersByDate).map((date, i) => (
            <div key={i}>
              <div className="orders-day" >
                <h3>{date}</h3>
              </div>
              <div className="content row">
                {userOrdersByDate[date].map(order => (
                  <div className="col-3" key={order._id}>
                    <div className="action-card">
                      <h2>{order.option.title}</h2>
                      <small> <b>{new Date(order.datePlaced).toLocaleString()}</b></small> <br></br>
                      <small>Order ID: {order._id}</small>
                      <small>Quantity: {order.quantity}</small>
                      <small>Cost: <b>N{order.quantity * order.option.price}</b>
                       &nbsp;</small>
                       <small> Status: <b>{order.orderStatus}</b></small>
                      <div className="btnss">
                        {order.orderStatus !== "Delivered" ?
                          <a className="btn modify-btn" onClick={() => handleConfirmClick(order._id)}>Confirm</a> : ""}
                        <a className="btn delete-btn" onClick={() => handleOrderDelete(order._id)}>delete</a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )) : <h2 style={{textAlign:"center", color:"grey"}}>Order History Is Empty!</h2>
           : <div  style={{ display: "flex", justifyContent: "center" }}>
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


export default connect(mapStateToProps, mapDispatchToProps)(UserOrders);