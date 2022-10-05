import axios from "axios";
export const GET_USER = "GET_USER";
export const GET_USER_ERRORS = "GET_USER_ERRORS";

export const getUser = (userId) => { 
  console.log(userId)
  return (dispatch) => {
    return  axios
      .get(`http://localhost:3000/api/auth/${userId}`)
      .then((res) => {
        dispatch({ type: GET_USER, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};

