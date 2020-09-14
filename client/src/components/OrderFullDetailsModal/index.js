import React, { Fragment } from 'react'

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

      {order.option ?
        <Fragment>
          <img src={order.option.imageUrl} alt="display-order" style={styles.image} />
          <div style={styles.details} className="order-popup-details">
            <p><b>Order ID</b>: {order._id}</p>
            <h4>Item: {order.option.title}</h4>
            <p><b>Date Placed</b>: {new Date(order.datePlaced).toLocaleString()}</p>
            <p><b>Customer</b>: {order.user.name}</p>
            <p><b>Delivery address</b>: {order.address}</p>
            <p><b>Quantity</b>: {order.quantity} units</p>
            <p><b>Total Cost</b>: N{order.quantity * order.option.price}</p>
          </div>
        </Fragment>
        : ""
      }
    </div>
  )
}

export default OrderFullDetailsModal
