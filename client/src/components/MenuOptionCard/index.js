import React, { Fragment } from 'react'
import foodImage from '../../assets/images/food-3.jpg'
import { Link, withRouter } from "react-router-dom";

const MenuOptionCard = ({ meal }) => {
  return (
    <Fragment>
      <div className="single-meal col-3">
        <div className="thumbnail">
          <img src={foodImage} />
        </div>
        <div className="meal-details">
          <span>{meal.title}</span><br></br>
          <small className="desc">{meal.description.slice(0, 31)}...</small>
          <p>N{meal.price}</p>
          <div className="read-more-button">
            <Link to={`/checkout/${meal._id}`}>check out &#8594;</Link>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default withRouter(MenuOptionCard);
