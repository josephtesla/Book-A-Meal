import React, { useState } from 'react'
import { useHistory, useLocation } from "react-router-dom";
import { connect } from 'react-redux';
import { userSignInAction, authenticate } from "../../actions/auth";
import Loader from "react-loader-spinner";
import "./index.css";


const styles = {
  errorDiv: {
    fontSize:"12px",
    padding: "10px",
    border: "1px solid red",
    color: "red"
  }
}

const mapStateToProps = ({ auth }) => ({
  error: auth.error,
  loading: auth.loading
})

const mapDispatchToProps = dispatch => ({
  signInUser: (loginDetails) => dispatch(userSignInAction(loginDetails)),
  authenticate: (resp, next) => dispatch(authenticate(resp, next))
})

const SignIn = ({ signInUser, authenticate, error, loading }) => {

  const history = useHistory();
  const location = useLocation();

  const { from } = location.state || { from: { pathname: "/admin/dashboard" } }

  //User Input refs

  const [state, setState] = useState({
    email: "",
    password:""
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState(state => ({...state, [name]: value}))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = state.email;
    const password = state.password;
    const data = { email, password, role: "admin" };
    const resp = await signInUser(data);
    if (!resp.error) {
      authenticate(resp, () => {
        history.replace(from);
      })
    }
  }

  return (
    <div>
      <div className="main-container">
        <main>
          <div className="section-heading">
            <span>Caterer/Admin Sign In</span>
          </div>

          <div className="form-wrapper">
            {loading ?
              <Loader
                style={{ marginTop: "30px" }}
                type="Audio"
                color="green"
                height={100}
                width={100}
              /> :
              <form className="signup-form" onSubmit={handleSubmit}>
                { error ? <span className="error-span" style={styles.errorDiv} > {error}</span> : ""}
                <input
                  type="email"
                  name="email"
                  className="form-input"
                  placeholder="Email Address"
                  required
                  value={state.email}
                  onChange={handleChange}
                />
                <input
                   type="password"
                   name="password"
                   className="form-input"
                   placeholder="Password"
                   required
                   value={state.password}
                   onChange={handleChange}
                />
                <button type="submit" className="form-button btn">Sign In &#8594;</button>
              </form>
            }
          </div>
        </main>
      </div>
    </div>
  )
}


export default connect(
  mapStateToProps,
  mapDispatchToProps)
(SignIn);