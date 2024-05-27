import api from './api';

export const loginUser = (username, password) => {

    const userDataJson = {
      username: username,
      password: password
    };
  
    return api.post('/users/login', userDataJson);

  };

export const registerUser = (username, email, password) => {

    const userDataJson = {
        username: username,
        email: email,
        password: password
      };
  
    return api.post('/users', userDataJson)
}

export const modifyUserData = (field, value, access_token) => {
  
  const userDataJson = {
    [field]: value
  };

  return api.patch('/users', userDataJson, {
    headers: {
      'Authorization': `Bearer ${access_token}`
    }
  })

}