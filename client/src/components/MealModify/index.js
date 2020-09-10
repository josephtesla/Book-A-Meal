import React, { useRef } from 'react'
import { updateMealAction } from '../../actions/meals';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { fetchMenuAction } from '../../actions/menu';
import { useHistory } from 'react-router-dom';


const mapDispatchToProps = (dispatch) => ({
  updateMealOption: (mealId) => dispatch(updateMealAction(mealId)),
  fetchMenu: () => dispatch(fetchMenuAction())
})

const MealModify = ({ meal, updateMealOption, fetchMenu }) => {

  const history = useHistory();

  const titleInput = useRef();
  const priceInput = useRef();
  const descriptionInput = useRef();
  const imageInput = useRef();


  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const data = {
      title: titleInput.current.value,
      price: priceInput.current.value,
      description: descriptionInput.current.value,
      imageUrl: "randomImage"
    }

    const resp = await updateMealOption(meal._id, data);
    if (!resp.error) {
      toast.success("Meal option updated successfully!", { autoClose: 4000 })
      fetchMenu();
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
        <button className="form-button btn">Submit &#8594;</button>
      </form>
    </div>
  )
}

export default connect(null, mapDispatchToProps)(MealModify);