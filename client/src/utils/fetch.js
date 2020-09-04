

export const API_URL = "http://localhost:5000/api/v1";

//FETCH API HELPERS

export const asyncGetData = async (pathname, token = "") => {
  const response = await fetch(`${API_URL}${pathname}`, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${token}`, 
    }
  });

  return response.json();
}


export const asyncPostData = async (pathname, token = "", data = {}) => {
   console.log(data)
    const response = await fetch(`${API_URL}${pathname}`, {
      method: 'POST',
      credentials: 'same-origin', 
      headers: {
        'Content-Type': 'application/json',
         Accept: 'application/json',
        'Authorization': `${token}`, 
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer', 
      body: JSON.stringify(data)
    });

    return response.json(); // parses JSON response into native JavaScript objects
}

export const asyncUpdateData = async (pathname, token = "", data = {}) => {
  const response = await fetch(`${API_URL}${pathname}`, {
    method: 'PUT',
    mode: 'cors', 
    credentials: 'same-origin', 
    headers: {
      'Content-Type': 'application/json',
       Accept: 'application/json',
      'Authorization': `${token}`, 
      
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer', 
    body: JSON.stringify(data)
  });
  return response.json(); // parses JSON response into native JavaScript objects

}


export const asyncDeleteData = async (pathname, token = "", data = {}) => {
  const response = await fetch(`${API_URL}${pathname}`, {
    method: 'DELETE',
    mode: 'cors', 
    credentials: 'same-origin', 
    headers: {
      'Content-Type': 'application/json',
       Accept: 'application/json',
      'Authorization': `${token}`, 
      
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer', 
    body: JSON.stringify(data)
  });
  return response.json(); // parses JSON response into native JavaScript objects

}