import React from "react";
import foodImageX from "../../assets/images/food-x.png"
import foodImage from '../../assets/images/food-3.jpg'
import { connect } from 'react-redux';
import { Link, withRouter } from "react-router-dom";
import Loader from "react-loader-spinner";
import MenuOptionCard from "../../components/MenuOptionCard";


const mapStateToProps = ({ auth, menu }) => ({
  isAuth: auth.isAuthenticated,
  user: auth.user,
  menu: menu.menu,
  menuLoading: menu.loading
})

const styles = {
  viewMoreDiv: {
    marginTop: "50px",
    textAlign: "center"
  }
}


const Menu = ({ isAuth, user, menu }) => {

  return (
    <div>
      <div className="main-container">
        <main>

          {!isAuth ?
            <div className="intro-section">
              <div className="row">
                <div className="col-2 intro-texts">
                  <h1>We offer the best meals  <br></br> in town</h1>
                  <p>Success isn't always about greatness. It's about consistency. <br></br>
                We are consistent  <br></br> <br></br>
                  </p> <br></br> <br></br>
                  <Link to="/signin" className="order-btn">Get Started Now &#8594;</Link>
                </div>
                <div className="col-2 intro-image">
                  <img src={foodImageX} alt="booster" />
                </div>
              </div>
            </div> :
            <div style={{ textAlign: "center" }}>
              <h3>Welcome, {user.name}</h3>
            </div>
          }

          <div className="section-heading" >
            <span>Today's Menu</span>
          </div>
          <div className="blog-posts row">
            {menu.length && menu[0].options.length ? menu[0].options.map(meal => (
                <MenuOptionCard  key={meal._id} meal={meal}/>
              )) : <div style={{ color: "grey", textAlign: "center", flexBasis:"100%"}}>
                <h1>We're cooking up something great!</h1>
                <small>Today's menu hasn't been set!</small>
              </div>
            }
          </div>

          {!isAuth ? <div style={styles.viewMoreDiv}>
            <Link to="/signin" className="order-btn">Sign In and Get More &#8594;</Link>
          </div> : ""}
        </main>
      </div>
    </div>
  )
}

export default withRouter(
  connect(mapStateToProps)(Menu)
);

