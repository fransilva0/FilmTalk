import api from './api';

export const userCreateComment = (comment, UserPost, access_token) => {

    const userDataJson = {
        comment: comment,
        post_id: UserPost
      };
  
      return api.post('/comments', userDataJson, {
          headers: {
            'Authorization': `Bearer ${access_token}`
          }
        })

}

export const userEditComment = (editComment, textComment, access_token) => {

    const editCommentData = editComment

    const userDataJson = {
        comment: textComment
    };
        
    return api.put(`/comments/${editCommentData.id}`, userDataJson, {
            headers: {
              'Authorization': `Bearer ${access_token}`
            }
          })

}

export const userDeleteComment = (editComment, access_token) => {

    const deleteCommentData = editComment

    return api.delete(`/comments/${deleteCommentData.id}`, {
          headers: {
            'Authorization': `Bearer ${access_token}`
          }
        })

}

export const viewComments = (UserPost, offset, accessToken) => {

    return api.get(`/comments?post_id=${UserPost}&offset=${offset}`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      })

}