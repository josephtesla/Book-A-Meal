import React from "react";
import {
  Route,
  Redirect
} from "react-router-dom";
import { connect } from "react-redux";

const mapStateToProps = state => ({
  user: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated
})

const CustomerRoute = ({ children, isAuthenticated, user, ...rest }) => {
  console.log(isAuthenticated, user)
  return (
    <Route
      {...rest}
      render={({ location }) => (
        (isAuthenticated && user.role === "customer") ?
          (children) :
          (
            <Redirect
              to={{
                pathname: "/signin",
                state: { from: location }
              }}
            />
          )
      )}
    >

    </Route>
  )
}

export default connect(
  mapStateToProps
)(CustomerRoute);