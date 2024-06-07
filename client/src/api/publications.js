import api from './api';

export const userEditPublication = (title, publication, UserPost, access_token) => {

    const userDataJson = {
        title: title,
        publication: publication
      };
    
    return api.put(`/posts/${UserPost}`, userDataJson, {
        headers: {
          'Authorization': `Bearer ${access_token}`
        }
      })
}

export const userDeletePublication = (UserPost, access_token) => {

    return api.delete(`/posts/${UserPost}`, {
        headers: {
          'Authorization': `Bearer ${access_token}`
        }
      })
}

export const userCreatePublication = (title, publication, access_token) => {

    const userDataJson = {
        title: title,
        publication: publication
      };
  
      return api.post('/posts', userDataJson, {
          headers: {
            'Authorization': `Bearer ${access_token}`
          }
        })

} 

export const viewPublication = (UserPost, access_token) => {

    return api.get(`/posts/${UserPost}`, {
        headers: {
          'Authorization': `Bearer ${access_token}`
        }
      })
}