import React, { useState, useEffect } from 'react'
import { Link, withRouter, useHistory, useLocation } from "react-router-dom";
import sideBarToggleImage from "../../assets/images/menu.png";
import "./index.css"
import { logout } from '../../actions/auth';
import { connect } from 'react-redux';
import Modal from "../PopupModal/index";


const mapStateToProps = ({ auth }) => ({
  isAuth: auth.isAuthenticated,
  user: auth.user
})

const mapDispatchToProps = dispatch => ({
  logout: (next) => dispatch(logout(next))
})


const Navigation = ({ user, isAuth, logout }) => {

  const history = useHistory();

  const [logoutModal, setLogoutModal] = useState(false);
  //SideBar Toggle
  const [open, setOpen] = useState(false);

  const location = useLocation();
  const currentLocation = location.pathname;

  useEffect(() => {
    setOpen(false)
  }, [currentLocation])

  const handleOpenClick = (e) => {
    setOpen(true)
  }

  const handleCloseClick = (e) => {
    e.preventDefault();
    setOpen(false)
  }

  const hideLogoutModal = () => {
    setLogoutModal(false);
  };

  const handleLogoutClick = () => {
    setLogoutModal(true);
  }

  const handleLogout = () => {
    setLogoutModal(false);
    logout(() => {
      history.push("/")
    })
  }

  return (
    <div className="header">

      <Modal show={logoutModal} handleClose={hideLogoutModal} headerTitle="Sign Out">
        <h3>
          Log out current session?
        </h3>
        <div className="modal-bottom">
          <button className="modal-yes-btn" onClick={handleLogout}>Yes</button>
          <button className="modal-close-btn" onClick={hideLogoutModal}>No</button>
        </div>
      </Modal>

      <div className="nav-container">
        <div className="navbar">
          <Link to="/">
            <h2>SALADOEATS</h2>
          </Link>
          <img
            id="nav-toggle"
            src={sideBarToggleImage}
            width="30px"
            height="30px"
            onClick={handleOpenClick}
          />
          {!isAuth ?
            <ul
              className="links"
              id="navbarItems"
              style={{ left: open ? "0px" : "100%" }}
            >
              <li>< button id="close-sidebar" onClick={handleCloseClick}>X</button></li>
              <li className="top-links"><Link to="/signin">Customer Login</Link></li>
              <li className="top-links"><Link to="/signup">Register</Link></li>
              <li className="top-links"><Link to="/admin/signin">Caterer Login</Link></li>
            </ul>

            : user.role === "admin" ?
              <ul
                className="links"
                id="navbarItems"
                style={{ left: open ? "0px" : "100%" }}
              >
                <li>< button id="close-sidebar" onClick={handleCloseClick}>X</button></li>
                <li className="top-links"><Link to="/admin/managemeals">Manage Meals</Link></li>
                <li className="top-links"><Link to="/admin/setupmenu">Menu Setup</Link></li>
                <li className="top-links"><Link to="/admin/orders">Orders</Link></li>
                <li className="top-links" onClick={handleLogoutClick}>Logout</li>
              </ul>
              : <ul
                className="links"
                id="navbarItems"
                style={{ left: open ? "0px" : "100%" }}
              >
                <li>< button id="close-sidebar" onClick={handleCloseClick}>X</button></li>
                <li className="top-links"><Link to="/customer/orders">Your Orders</Link></li>
                <li className="top-links" onClick={handleLogoutClick}>Logout</li>
              </ul>
          }
        </div>
      </div>
    </div>
  )
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Navigation)
)