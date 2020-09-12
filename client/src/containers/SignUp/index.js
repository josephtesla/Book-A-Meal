import React, { useState } from 'react'
import "../SignIn/index.css"
import { Link } from 'react-router-dom'
import { userSignUpAction } from "../../actions/auth";
import Loader from "react-loader-spinner";
import { connect } from 'react-redux';


const mapStateToProps = ({ auth }) => ({
  error: auth.error,
  loading: auth.loading
})

const mapDispatchToProps = dispatch => ({
  signUpUser: (data) => dispatch(userSignUpAction(data)),
})

const styles = {
  errorDiv: {
    fontSize: "12px",
    padding: "10px",
    border: "1px solid red",
    color: "red"
  }
}


const SignUp = ({ loading, error, signUpUser }) => {

  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    cPassword: "",
    formError: "",
    success: false
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState(state => ({ ...state, [name]: value }))
  }

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { ...state, role: "customer" };
    if (data.password != data.cPassword) {
      setState(state => ({ ...state, formError: "Passwords do not match!" }))
    } else {
      setState(state => ({ ...state, formError: "" }));
      const resp = await signUpUser(data);
      console.log(resp)
    }
  }


  return (
    <div>
      <div className="main-container">
        <main>
          <div className="section-heading">
            <span>Create An Account</span>
          </div>

          <div className="form-wrapper">
            {!loading ?
              !state.success ?
                <form className="signup-form" onSubmit={handleSubmit}>
                  {state.formError ? <span className="error-span" style={styles.errorDiv} > {state.formError}</span> : ""}
                  {error ? <span className="error-span" style={styles.errorDiv} > {error}</span> : ""}
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Enter Your Name"
                    name="name"
                    value={state.name}
                    onChange={handleChange} />
                  <input
                    type="email"
                    className="form-input"
                    placeholder="Email Address"
                    name="email"
                    value={state.email}
                    onChange={handleChange}
                  />
                  <input
                    type="password"
                    className="form-input"
                    placeholder="Create Password"
                    name="password"
                    value={state.password}
                    onChange={handleChange}
                  />
                  <input
                    type="password"
                    className="form-input"
                    placeholder="Confirm Password"
                    name="cPassword"
                    value={state.cPassword}
                    onChange={handleChange}
                  />
                  <button className="form-button btn">Create Account &#8594;</button>
                  <span>Already registed? <Link to="/signin">Sign In &#8594;</Link></span>
                </form> : <h4 style={{
                  color: "green"
                }}>Account Activation link successfully sent to your email address. Head to your email
                to activate your account</h4>
              : <Loader
                style={{ marginTop: "30px" }}
                type="Audio"
                color="green"
                height={100}
                width={100}
              />}
          </div>

        </main>
      </div>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);      