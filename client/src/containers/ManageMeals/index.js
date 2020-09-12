import React, { useRef, useState } from 'react'
import "./index.css"
import { connect } from 'react-redux';
import { addMealsAction, removeMealsAction } from '../../actions/meals';
import { toast, ToastContainer } from "react-toastify"
import MealModify from "../../components/MealModify";
import Modal from '../../components/PopupModal';
import { fetchMenuAction } from '../../actions/menu';
import Loader from "react-loader-spinner";
import { API_URL } from '../../utils/fetch';



const mapStateToProps = ({ meals }) => ({
  meals: meals.meals,
  mealsLoading: meals.loading
})

const mapDispatchToProps = (dispatch) => ({
  addMealOption: (data) => dispatch(addMealsAction(data)),
  removeMealOption: (mealId) => dispatch(removeMealsAction(mealId)),
  fetchMenu: () => dispatch(fetchMenuAction())
})

const ManageMeals = ({ meals, mealsLoading, addMealOption, removeMealOption, fetchMenu }) => {

  const [ConfirmModal, setConfirmModal] = useState(false);
  const [mealToModify, setMealToModify] = useState({});
  const [selectedImage, setSelectedImage] = useState("");
  const [addLoading, setAddLoading] = useState(false)

  const titleInput = useRef();
  const priceInput = useRef();
  const descriptionInput = useRef();
  const imageInput = useRef();

  const handleOptionSubmit = async (e) => {
    e.preventDefault();

    const { value } = priceInput.current;

    const regExp = new RegExp(/^\d*\.?\d*$/);
    if (!regExp.test(value) || Number(value) < 0) {
      toast.error("Invalid price input!", { autoClose: 3000 })
      return
    }

    const formData = new FormData();
    formData.append("image", imageInput.current.files[0])

    setAddLoading(true)
    //process image on cloud.
    const image_resp = await (await fetch(API_URL + "/meals/process-image", {
      method:"POST",
      headers:{ Accept:"application/json" },
      body: formData
    })).json();

    const data = {
      title: titleInput.current.value,
      price: priceInput.current.value,
      description: descriptionInput.current.value,
      imageUrl: image_resp.url || ""
    }

    const resp = await addMealOption(data);
    if (!resp.error) {
      toast.success("Meal Option added successfully! ", { autoClose: 4000 })
    }
    else {
      toast.error(resp.error, { autoClose: 4000 })
    }
    setAddLoading(false)
  }


  const handleRemoveClick = async (mealId) => {
    const resp = await removeMealOption(mealId);
    if (!resp.error) {
      toast.success("Meal option removed successfully! ", { autoClose: 4000 })
      fetchMenu();
    }
    else {
      toast.error(resp.error, { autoClose: 4000 })
    }
  }

  const hideConfirmModal = () => {
    setConfirmModal(false);
  };

  const handleConfirmClick = (meal) => {
    setMealToModify(meal);
    setConfirmModal(true);
  }

  const onImageChange = () => {
    const image = imageInput.current.files[0];
    console.log(image)
    setSelectedImage(image.name)
  }

  return (
    <div>
      <Modal show={ConfirmModal} handleClose={hideConfirmModal} headerTitle="Modify Meal Option">
        <MealModify meal={mealToModify} />
        <div className="modal-bottom">
          <button className="modal-close-btn" onClick={hideConfirmModal}>Close</button>
        </div>
      </Modal>

      <ToastContainer />
      <div className="main-container">
        <main>
          <div className="section-heading">
            <span>Manage Meals</span>
          </div>
          <div className="menu-page row">
            <div className="order-details col-2">
              <h2>Modify/Remove Options</h2>
              {!mealsLoading ? meals.length ?
                <div className="all-options">
                  {meals.map(meal => (
                    <div className="action-card" key={meal._id}>
                      <div className="flex-items">
                        <img src={meal.imageUrl} width="50%" alt="booster" />
                        <div className="details">
                          <h3>{meal.title}</h3>
                          <small>Price: <b>N{meal.price}</b> </small>
                        </div>
                      </div>
                      <div className="btnss">
                        <a className="btn modify-btn" onClick={() => handleConfirmClick(meal)}>Modify</a>
                        <a className="btn delete-btn" onClick={() => handleRemoveClick(meal._id)}>delete</a>
                      </div>
                    </div>
                  ))}
                </div> :
                <h3
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    margin: "100px 0",
                    color: "grey"
                  }}>
                  No meal option found. Add a new meal!
              </h3> : <Loader
                  style={{ marginTop: "40px" }}
                  type="Audio"
                  color="green"
                  height={100}
                  width={100}
                />}
            </div>
            <div className="order-details col-2 add-meal">
              <h2>Add Meal Option </h2>
              <div>
                {addLoading ? 
                <Loader
                style={{ marginTop: "40px" }}
                type="Audio"
                color="green"
                height={100}
                width={100}
              />: ""}
              </div>
              <form
                encType="multipart/form-data"
                className="signup-form add-meal-form"
                onSubmit={handleOptionSubmit}>
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
                  id="files"
                  name="image"
                  accept="image/*"
                  className="form-input"
                  ref={imageInput}
                  className="hidden"
                  required
                  onChange={onImageChange}
                />
                <div style={{
                  display:"flex",
                  justifyContent:"space-between",
                  flexWrap:"wrap",
                  alignItems:"center"
                }}>
                <label className="upload-image-label" htmlFor="files">Upload An Image for Meal  &#8594;</label>
                <small> &nbsp; {selectedImage}</small>
                </div>
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