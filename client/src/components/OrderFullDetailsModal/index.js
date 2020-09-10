import React from 'react'
import foodImage from '../../assets/images/food-3.jpg'

const styles = {
  image: {
    width: "100%",
    maxWidth: "270px",
    height: "200px",
    boxShadow: "0px 2px 2px 2px rgba(0, 0, 0, 0.3)",
    marginBottom: "15px"
  },

  main: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "",
    flexWrap: "wrap"
  },

}

const OrderFullDetailsModal = ({ order }) => {
  return (
    <div style={styles.main}>
      <img src={foodImage} alt="display-order" style={styles.image} /> 
      {order.option ?
        <div style={styles.details} className="order-popup-details">
          <p><b>Order ID</b>: {order._id}</p>
          <h4>Item: {order.option.title}</h4>
          <p><b>Date Placed</b>: {new Date(order.datePlaced).toLocaleString()}</p>
          <p><b>Customer</b>: {order.user.name}</p>
          <p><b>Quantity</b>: {order.quantity} units</p>
          <p><b>Total Cost</b>: N{order.quantity * order.option.price}</p>
        </div>
        : ""
      }
    </div>
  )
}

export default OrderFullDetailsModal
