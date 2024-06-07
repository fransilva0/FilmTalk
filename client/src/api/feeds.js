import api from './api';

export const checkPostsFeed = (offset, access_token) => {
  return api.get(`/posts?offset=${offset}`, {
            headers: {
              'Authorization': `Bearer ${access_token}`
            }
          })
}

export const generalUserFeed = (offset, access_token) => {
  return api.get(`/posts/page?offset=${offset}`, {
    headers: {
      'Authorization': `Bearer ${access_token}`
    }
  })
}