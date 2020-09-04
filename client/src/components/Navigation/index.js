import React, { useState, useEffect } from 'react'
import { Link, withRouter, useHistory, useLocation } from "react-router-dom";
import sideBarToggleImage from "../../assets/images/menu.png";
import "./index.css"
import { logout } from '../../actions/auth';
import { connect } from 'react-redux';


const mapStateToProps = ({ auth }) => ({
  isAuth: auth.isAuthenticated,
  user: auth.user
})

const mapDispatchToProps = dispatch => ({
  logout: (next) => dispatch(logout(next))
})


const Navigation = ({ user, isAuth, logout }) => {

  const history = useHistory();
  

  //SideBar Toggle
  const [open, setOpen] = useState(false);

  const handleOpenClick = (e) => {
    setOpen(true)
  }

  const handleCloseClick = (e) => {
    e.preventDefault();
    setOpen(false)
  }

  const location = useLocation();
  const currentLocation = location.pathname;

  useEffect(() => {
    setOpen(false)
  }, [currentLocation]) 

  const handleLogout = () => {
    logout(() => {
      history.push("/")
    })
  }

  return (
    <div className="header">
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
          {! isAuth ?
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
                <li className="top-links" onClick={handleLogout}>Logout</li>
              </ul>
              : <ul
                className="links"
                id="navbarItems"
                style={{ left: open ? "0px" : "100%" }}
              >
                <li>< button id="close-sidebar" onClick={handleCloseClick}>X</button></li>
                <li className="top-links"><Link to="/customer/orders">Your Orders</Link></li>
                <li className="top-links" onClick={handleLogout}>Logout</li>
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