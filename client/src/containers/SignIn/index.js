import React, { useRef } from 'react'
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

  const { from } = location.state || { from: { pathname: "/" } }

  //User Input refs
  const userEmail = useRef();
  const userPassword = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = userEmail.current.value;
    const password = userPassword.current.value;
    const data = { email, password, role: "customer" };
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
            <span>Customer Sign In</span>
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
                  className="form-input"
                  placeholder="Email Address"
                  required
                  ref={userEmail}
                />
                <input
                  type="password"
                  className="form-input"
                  placeholder="Password"
                  required
                  ref={userPassword}
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