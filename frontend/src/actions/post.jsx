import axios from "axios";

export const GET_POSTS = "GET_POSTS";
export const ADD_POST = "ADD_POST";
export const LIKE_POST = "LIKE_POST";
export const REMOVE_LIKE = "REMOVE_LIKE";
export const UPDATE_POST = "UPDATE_POST";
export const DELETE_POST = "DELETE_POST";

export const ADD_COMMENT = "ADD_COMMENT";
export const EDIT_COMMENT = "EDIT_COMMENT";
export const DELETE_COMMENT = "DELETE_COMMENT";

export const GET_POST_ERRORS = "GET_POST_ERRORS";

export const getPosts = (num) => {
  return (dispatch) => {
    return axios
      .get(`http://localhost:3000/api/post/`)
      .then((res) => {
        const array = res.data.slice(0, num);
        dispatch({ type: GET_POSTS, payload: array });
      })
      .catch((err) => console.log(err));
  };
};

export const addPost = (data) => {
  return (dispatch) => {
    return axios.post(`http://localhost:3000/api/post/`, data, {
      headers: {
        'content-type': 'multipart/form-data',
      },
    }).then((res) => {
      console.log(res.data)
      dispatch({ type: ADD_POST, payload: res.data });
    });
  };
};

export const likePost = (postId, userId) => {
  return async (dispatch) => {
    return await axios({
      method: "patch",
      url: `http://localhost:3000/api/post/like/${postId}`,
      data: { id: userId },
    })
      .then(() => {
        dispatch({ type: LIKE_POST, payload: { postId, userId } });
      })
      .catch((err) => console.log(err));
  };
};

export const removeLike = (postId, userId) => {
  return (dispatch) => {
    return axios({
      method: "delete",
      url: `http://localhost:3000/api/post/dislike/${postId}`,
      data: { id: userId },
    })
      .then(() => {
        dispatch({ type: REMOVE_LIKE, payload: { postId, userId } });
      })
      .catch((err) => console.log(err));
  };
};

export const updatePost = (postId, message, picture) => {
  return (dispatch) => {
    return axios.put(`http://localhost:3000/api/post/${postId}`, {message, picture}, {
      headers: {
        'content-type': 'multipart/form-data',
      },
    })
      .then((res) => {
        dispatch({ type: UPDATE_POST, payload: { message, postId, newPictureUrl: res.data.picture } });
      })
      .catch((err) => console.log(err));
  };
};

export const deletePost = (postId) => {
  return (dispatch) => {
    return axios({
      method: "delete",
      url: `http://localhost:3000/api/post/${postId}`,
    })
      .then(() => {
        dispatch({ type: DELETE_POST, payload: { postId } });
      })
      .catch((err) => console.log(err));
  };
};

export const addComment = (postId, commenterId, text) => {
  return (dispatch) => {
    return axios({
      method: "patch",
      url: `http://localhost:3000/api/post/comment-post/${postId}`,
      data: { commenterId, text },
    })
      .then(() => {
        dispatch({ type: ADD_COMMENT, payload: { postId } });
      })
      .catch((err) => console.log(err));
  };
};

export const editComment = (postId, commentId, text) => {
  console.log(postId, commentId, text);
  return (dispatch) => {
    return axios({
      method: "patch",
      url: `http://localhost:3000/api/post/edit-comment-post/${postId}`,
      data: { commentId, text },
    })
      .then((res) => {
        console.log(res);
        dispatch({
          type: EDIT_COMMENT,
          payload: { postId: res.data._id, newComment: res.data.comments },
        });
      })
      .catch((err) => console.log(err));
  };
};

export const deleteComment = (postId, commentId) => {
  return (dispatch) => {
    return axios({
      method: "patch",
      url: `http://localhost:3000/api/post/delete-comment-post/${postId}`,
      data: { commentId },
    })
      .then((res) => {
        dispatch({ type: DELETE_COMMENT, payload: { postId, commentId } });
      })
      .catch((err) => console.log(err));
  };
};
