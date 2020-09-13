import React, { useState, useEffect } from 'react'
import { useHistory, useLocation, Link, useRouteMatch } from "react-router-dom";
import { connect } from 'react-redux';
import { userSignInAction, authenticate } from "../../actions/auth";
import Loader from "react-loader-spinner";
import "./index.css";
import { toast, ToastContainer } from 'react-toastify';


const styles = {
  errorDiv: {
    fontSize: "12px",
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

  const [state, setState] = useState({
    email: "",
    password: "",
    newSignUp: false
  })

  useEffect(() => {
    if (location.search) {
      const role = location.search.split("=")[1];
      toast.success(`${role === "admin"? "Caterer" : role} account activated!. You can now login.`, 
      { autoClose: 4000 })
    }
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState(state => ({ ...state, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = state.email;
    const password = state.password;
    const data = { email, password };
    const resp = await signInUser(data);
    if (!resp.error) {
      authenticate(resp, () => {
        history.push(resp.user.role === "customer"? "/": "/admin/dashboard")
      })
    } 
  }

  return (
    <div>
      <div className="main-container">
        <main>
          <ToastContainer />
          <div className="section-heading">
            <span>User Sign In</span>
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
                {error ? <span className="error-span" style={styles.errorDiv} > {error}</span> : ""}
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
                <span>No Account? <Link to="/signup">Sign Up</Link></span>
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