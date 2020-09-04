import React from 'react'
import { Link, withRouter } from "react-router-dom";
import "./index.css"


const AdminDashboard = () => {
  return (
    <div>
      <div className="main-container">
        <main>
          <div className="section-heading" >
            <span>Admin/Caterer Panel</span>
          </div>
          <div className="content row">
            <div className="col-3">
              <div className="action-card-1">
                <h2>Set Up Menu For Today</h2>
                <small>You've not set up Today's Menu</small>
                <Link className="btn action-btn" to="/admin/setupmenu">Setup Menu</Link>
              </div>
            </div>
            <div className="col-3">
              <div className="action-card-1">
                <h2>Manage Meal Options</h2>
                <small>Add, modify and remove available meal options</small>
                <Link className="btn action-btn" to="/admin/managemeals">Manage</Link>
              </div>
            </div>
            <div className="col-3">
              <div className="action-card-1">
                <h2>View All Orders</h2>
                <small>review every order that has been placed and total amount made</small>
                <Link className="btn action-btn"vto="/admin/orders">View All </Link>
              </div>
            </div>
          </div>
        </main>
      </div>

    </div>
  )
}

export default withRouter(AdminDashboard);