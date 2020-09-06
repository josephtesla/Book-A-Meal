import React, { useState } from 'react'
import foodImage from '../../assets/images/food-3.jpg'
import "./index.css";
import { toast, ToastContainer } from "react-toastify"
import { connect } from "react-redux";
import Modal from "../../components/PopupModal"
import { setupMenuAction } from '../../actions/menu';

const mapStateToProps = ({ meals, menu }) => ({
  meals: meals.meals,
  menu: menu.menu
})

const mapDispatchToProps = (dispatch) => ({
  setupMenu: (data) => dispatch(setupMenuAction(data)),
})


const MenuSetup = ({ meals, menu, setupMenu }) => {

  console.log(menu)

  const [selectedOptions, setOptions] = useState([]);
  const [MenuConfirmModal, setMenuConfirmModal] = useState(false);

  const handleChecked = (e, optionId) => {
    const isChecked = e.target.checked;
    const tmpOptions = selectedOptions;
    if (isChecked) {
      tmpOptions.push(optionId);
    }
    else {
      tmpOptions.splice(tmpOptions.indexOf(optionId), 1)
    }
    setOptions(tmpOptions)
  }

  const hideMenuConfirmModal = () => {
    setMenuConfirmModal(false);
  };

  const handleMenuConfirmClick = () => {
    setMenuConfirmModal(true);
  }

  const handleMenuConfirm = async () => {
    setMenuConfirmModal(false);
    const data = {
      menuOptions: selectedOptions
    }
    const resp = await setupMenu(data);
    if (!resp.error) {
      toast.success("Menu setup successful", { autoClose: 4000})
    } else {
      toast.success(resp.error, { autoClose: 4000 })
    }
  }

  let hasEmptyMenu = selectedOptions.length === 0;

  return (
    <div>
      <Modal show={MenuConfirmModal} handleClose={hideMenuConfirmModal}>
        <h3>
          {!hasEmptyMenu ? "Continue To Setup Selected Meal Options For Today's Menu?"
            : "Please Select Some Meal Options To Continue"}
        </h3>
        <div className="modal-bottom">
          {!hasEmptyMenu ? <button className="modal-yes-btn" onClick={handleMenuConfirm}>Yes</button> : ""}
          <button className="modal-close-btn" onClick={hideMenuConfirmModal}>{!hasEmptyMenu ? "No" : "Cancel"}</button>
        </div>
      </Modal>
      <ToastContainer />
      <div className="main-container">
        <main>
          <div className="section-heading">
            <span>Today's Menu Setup</span>
          </div>
          <div className="menu-page row">
            <div className="menu-col-1 col-2">
              {menu.length ? <h1>Today's menu has been set!. You can still modify it though. </h1>: <h1>Today's menu has not been set yet! </h1>}
            </div>
            <div className="order-details col-2" >
              <h2>Select from meal options</h2>
              <hr></hr>
              <div className="all-options-0">
                {meals.map(meal => (
                  <div className="action-card-0" key={meal._id}>
                    <input
                      type="checkbox"
                      name=""
                      onChange={(e) => handleChecked(e, `${meal._id}`)}
                    />
                    <img src={foodImage} width="50%" alt="" />
                    <div className="details-0">
                      <h3>{meal.title}</h3>
                      <small>Price: <b>N{meal.price}</b> </small>
                    </div>
                  </div>
                ))}
              </div>
              <button className="btn place-btn-0" onClick={handleMenuConfirmClick}>Finish Menu Setup &#8594;</button>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuSetup);
