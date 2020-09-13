import React, { useRef, useState, useEffect } from 'react'
import { updateMealAction, fetchMealsAction } from '../../actions/meals';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { fetchMenuAction } from '../../actions/menu';
import { useHistory } from 'react-router-dom';


const mapDispatchToProps = (dispatch) => ({
  updateMealOption: (mealId, data) => dispatch(updateMealAction(mealId, data)),
  fetchMeals: () => dispatch(fetchMealsAction()),
  fetchMenu: () => dispatch(fetchMenuAction())
})

const MealModify = ({ meal, updateMealOption, fetchMenu, fetchMeals }) => {

  console.log(meal)

  const history = useHistory();
  const [state, setState] = useState({
    title: meal.title,
    price: meal.price,
    description: meal.description
  })

  useEffect(() => {
    if (Object.values(meal).length) {
      setState({
        title: meal.title,
        price: meal.price,
        description: meal.description
      })
    }
  }, [meal])


  const imageInput = useRef();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState(state => ({ ...state, [name]: value }))
  }

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const data = {
      title: state.title,
      price: state.price,
      description: state.description,
      imageUrl: "randomImage"
    }

    const resp = await updateMealOption(meal._id, data);
    if (!resp.error) {
      toast.success("Meal option updated successfully!", { autoClose: 4000 })
      fetchMenu();
      fetchMeals();
      setTimeout(() => {
        history.push("/some-shi");
        history.replace("/admin/managemeals");
      }, 2000);
    } else {
      toast.error(resp.error, { autoClose: 4000 })
    }
  }


  return (
    <div>
      <form className="signup-form add-meal-form" onSubmit={handleEditSubmit}>
        <input
          type="text"
          className="form-input"
          placeholder="Title (e.g Beef and Rice)"
          required
          name="title"
          value={state.title}
          onChange={handleChange}
        />
        <textarea
          placeholder="Brief meal description"
          cols="40"
          rows="6"
          className="form-input"
          required
          name="description"
          value={state.description}
          onChange={handleChange}
        ></textarea>
        <input
          type="text"
          className="form-input"
          placeholder="Enter price per quantity"
          required
          name="price"
          value={state.price}
          onChange={handleChange}
        />
        <input
          type="file"
          className="form-input"
          name="image"
          ref={imageInput}
        />
        <button className="form-button btn">Submit &#8594;</button>
      </form>
    </div>
  )
}

export default connect(null, mapDispatchToProps)(MealModify);