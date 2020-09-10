import React from 'react'
import "../SignIn/index.css"
import { Link } from 'react-router-dom'

export default function SignUp() {
  return (
    <div>
      <div className="main-container">
        <main>

          <div className="section-heading">
            <span>Create An Account</span>
          </div>

          <div className="form-wrapper">
            <form className="signup-form">
              <input
                type="text"
                className="form-input"
                placeholder="Enter Your Name" />
              <input
                type="email"
                className="form-input"
                placeholder="Email Address"
              />
              <input
                type="password"
                className="form-input"
                placeholder="Create Password"
              />
              <input
                type="password"
                className="form-input"
                placeholder="Confirm Password"
              />
              <a className="form-button btn">Create Account &#8594;</a>
              <span>Already registed? <Link to="/signin">Sign In &#8594;</Link></span>
            </form>
          </div>

        </main>
      </div>
    </div>
  )
}
