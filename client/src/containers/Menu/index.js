import React, { useEffect, useState } from "react";
import foodImageX from "../../assets/images/food-x.png"
import { connect } from 'react-redux';
import { Link, withRouter } from "react-router-dom";
import MenuOptionCard from "../../components/MenuOptionCard";
import "./index.css"

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

  const [appMenu, setAppMenu] = useState([])

  useEffect(() => {
    if (menu.length){
      setAppMenu(menu)

      if (!isAuth){
        setAppMenu(menu.slice(0, menu.length - 1))
      }
    }
  }, [menu, isAuth])

  return (
    <div>
      <div className="main-container">
        <main>

          {!isAuth ?
            <div className="intro-section">
              <div className="row">
                <div className="col-2 intro-texts">
                  <h1>Enjoy Meals  <br></br> From Your Best Resturants</h1>
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
          <div>
            {menu.length ?
              appMenu.map((singleMenu, i) => (
                <div className="shop-meals">
                  <h4 className="menu-caterer">{singleMenu.caterer.shop}</h4>
                  <div key={i} className="row">
                    {singleMenu.options.map(meal => (
                      <MenuOptionCard key={meal._id} meal={meal} />
                    ))}
                  </div>
                </div>
              ))
              : <div style={{ color: "grey", textAlign: "center", flexBasis: "100%" }}>
                <h1>Vendors are cooking up something great!</h1>
                <small>No menu has been set for today!</small>
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

