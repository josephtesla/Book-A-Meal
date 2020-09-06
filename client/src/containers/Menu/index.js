import React from "react";
import foodImageX from "../../assets/images/food-x.png"
import foodImage from '../../assets/images/food-3.jpg'
import { connect } from 'react-redux';
import { Link, withRouter } from "react-router-dom";


const mapStateToProps = ({ auth, menu }) => ({
  isAuth: auth.isAuthenticated,
  user: auth.user,
  menu: menu.menu
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
                  <h1>We offer the best meals  <br></br> In Nigeria</h1>
                  <p>Success isn't always about greatness. It's about consistency. <br></br>
                We are consistent  <br></br> <br></br>
                  </p> <br></br> <br></br>
                  <a href="login.html" className="order-btn">Get Started Now &#8594;</a>
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
            {menu.length ? menu[0].options.map(meal => (

              <div className="single-meal col-3" key={meal._id}>
                <div className="thumbnail">
                  <img src={foodImage} />
                </div>
                <div className="meal-details">
                  <span>{meal.title}</span><br></br>
                  <small className="desc">{meal.description}</small>
                  <p>N{meal.price}</p>
                  <div className="read-more-button">
                    <Link to={`/checkout/${meal._id}`}>check out &#8594;</Link>
                  </div>
                </div>
              </div>

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

