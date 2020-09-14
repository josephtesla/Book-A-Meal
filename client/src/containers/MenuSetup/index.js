import React, { useState, useEffect } from 'react'
import "./index.css";
import { toast, ToastContainer } from "react-toastify"
import { connect } from "react-redux";
import Modal from "../../components/PopupModal"
import { setupMenuAction, fetchMenuAction } from '../../actions/menu';
import Loader from "react-loader-spinner";


const mapStateToProps = ({ meals, menu, auth }) => ({
  meals: meals.meals,
  menu: menu.menu,
  mealsLoading: meals.loading,
  user: auth.user
})

const mapDispatchToProps = (dispatch) => ({
  setupMenu: (data) => dispatch(setupMenuAction(data)),
  fetchMenu: () => dispatch(fetchMenuAction())
})


const MenuSetup = ({
  user,
  meals,
  menu,
  setupMenu,
  mealsLoading,
  fetchMenu
}) => {

  console.log(menu)

  const [selectedOptions, setOptions] = useState([]);
  const [MenuConfirmModal, setMenuConfirmModal] = useState(false);
  const [caterersMenu, setCaterersMenu] = useState([])

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
      fetchMenu();
      toast.success("Menu setup successful", { autoClose: 4000 })
    } else {
      toast.success(resp.error, { autoClose: 4000 })
    }
  }

  let hasEmptyMenu = selectedOptions.length === 0;

  useEffect(() => {
    if (menu.length) {
      setCaterersMenu(menu.filter(singleMenu => singleMenu.caterer._id === user._id))
    }
  }, [menu])

  console.log(menu, caterersMenu)

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
              {caterersMenu.length && caterersMenu[0].options.length ? 
              <h1>Today's menu has been set!. You can still reset it though. </h1>
               : <h1>Today's menu has not been set yet! </h1>}
            </div>
            <div className="order-details col-2" >
              <h2>Select from meal options</h2>
              <hr></hr>
              <div className="all-options-0">
                {!mealsLoading ? meals.length ? meals.map(meal => (
                  <div className="action-card-0" key={meal._id}>
                    <input
                      type="checkbox"
                      name=""
                      onChange={(e) => handleChecked(e, `${meal._id}`)}
                    />
                    <img src={meal.imageUrl} width="50%" alt="" />
                    <div className="details-0">
                      <h3>{meal.title}</h3>
                      <small>Price: <b>N{meal.price}</b> </small>
                    </div>
                  </div>
                )) : <h3 style={{ margin: "40px", color: "grey" }}>NO MEAL OPTIONS FOUND</h3> : <Loader
                    style={{ margin: "40px" }}
                    type="Audio"
                    color="green"
                    height={100}
                    width={100}
                  />}
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
