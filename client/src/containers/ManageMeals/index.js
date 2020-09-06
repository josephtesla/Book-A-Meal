import React, { useRef } from 'react'
import foodImage from "../../assets/images/food-11.jpeg"
import "./index.css"
import { connect } from 'react-redux';
import { addMealsAction, removeMealsAction } from '../../actions/meals';
import { toast, ToastContainer } from "react-toastify"

const mapStateToProps = ({ meals }) => ({
  meals: meals.meals
})

const mapDispatchToProps = (dispatch) => ({
  addMealOption: (data) => dispatch(addMealsAction(data)),
  removeMealOption: (mealId) => dispatch(removeMealsAction(mealId))
})

const ManageMeals = ({ meals, addMealOption, removeMealOption }) => {

  const titleInput = useRef();
  const priceInput = useRef();
  const descriptionInput = useRef();
  const imageInput = useRef();

  const handleOptionSubmit = async (e) => {
    e.preventDefault();

    const fakeImages = ["food-3.jpg", "food-4.jpg", "food-11.jpeg", "food-12.jpeg", "food-6.jpg", "food-10.jpeg", "food-8.jpeg"];
    const randomImage = fakeImages[Math.floor(Math.random() * fakeImages.length - 1)];

    const data = {
      title: titleInput.current.value,
      price: priceInput.current.value,
      description: descriptionInput.current.value,
      imageUrl: randomImage
    }

    const resp = await addMealOption(data);
    if (!resp.error) {
      toast.success("Meal Option added successfully! ", { autoClose: 4000 })
    }
    else {
      toast.error(resp.error, { autoClose: 4000 })
    }
  }


  const handleRemoveClick = async (mealId) => {
    const resp = await removeMealOption(mealId);
    if (!resp.error) {
      toast.success("Meal option removed successfully! ", { autoClose: 4000 })
    }
    else {
      toast.error(resp.error, { autoClose: 4000 })
    }
  }

  return (
    <div>
      <ToastContainer />
      <div className="main-container">
        <main>
          <div className="section-heading">
            <span>Manage Meals</span>
          </div>
          <div className="menu-page row">
            <div className="order-details col-2">
              <h2>Modify/Remove Options</h2>
              <div className="all-options">
                {meals.map(meal => (
                  <div className="action-card" key={meal._id}>
                    <div className="flex-items">
                      <img src={foodImage} width="50%" alt="booster" />
                      <div className="details">
                        <h3>{meal.title}</h3>
                        <small>Price: <b>N{meal.price}</b> </small>
                      </div>
                    </div>
                    <div className="btnss">
                      <a className="btn modify-btn" >Modify</a>
                      <a className="btn delete-btn" onClick={() => handleRemoveClick(meal._id)}>delete</a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="order-details col-2 add-meal">
              <h2>Add Meal Option </h2>
              <form className="signup-form add-meal-form" onSubmit={handleOptionSubmit}>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Title (e.g Beef and Rice)"
                  required
                  ref={titleInput}
                />
                <textarea
                  placeholder="Brief meal description"
                  cols="40"
                  rows="6"
                  className="form-input"
                  required
                  ref={descriptionInput}
                ></textarea>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Enter price per quantity"
                  required
                  ref={priceInput}
                />
                <input
                  type="file"
                  className="form-input"
                  ref={imageInput}
                />
                <button className="form-button btn">Submit Option &#8594;</button>
              </form>
            </div>
          </div>

        </main>
      </div>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageMeals);