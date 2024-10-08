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

export const viewDataProfileConfig = (access_token) => {
  return api.get('/users/profile', {
    headers: {
      'Authorization': `Bearer ${access_token}`
    }
  })
}

export const modifyUserProfileData = (field, value, access_token) => {
  
  const userDataJson = {
    [field]: value
  };

  return api.put('/users/profile', userDataJson, {
    headers: {
      'Authorization': `Bearer ${access_token}`
    }
  })
}


export const userProfile = (username) => {
  return api.get(`/users/${username}/profile`)
}

export const userProfileViewPosts = (username, offset) => {
  return api.get(`/posts/${username}/page?offset=${offset}`)
}