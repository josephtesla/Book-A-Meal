import jwt from "jsonwebtoken";

export const setLocalStorage = (key, value) => {
  if (window !== 'undefined') {
    localStorage.setItem(key, value);
  }
};

// remove from localstorage
export const removeLocalStorage = keys => {
  if (window !== 'undefined') {
    keys.forEach(key => {
      localStorage.removeItem(key);
    });
  }
};


export const getUser = () => {
  if (window !== "undefined") {
    return localStorage.getItem("user")
  }
}


const decodeToken = token => {
  return jwt.decode(token);
}

export const userIsLoggedIn = () => {
  if (window !== 'undefined') {
    const access_token = localStorage.getItem("token");
    if (access_token) {
      //check if user still in session
      const tokenDetails = decodeToken(access_token);
      const { user, exp } = tokenDetails;
      if (new Date() > new Date(exp)){
        return [true, user, access_token]
      }
    }
  }

  return [false, null, null]
}

export const getAccessToken = () => {
  if (window !== 'undefined') {
    return localStorage.getItem("token");
  }
  return null
}