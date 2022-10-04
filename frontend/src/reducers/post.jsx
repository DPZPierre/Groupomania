import {
  ADD_POST,
  DELETE_COMMENT,
  DELETE_POST,
  EDIT_COMMENT,
  GET_POSTS,
  LIKE_POST,
  UPDATE_POST,
} from "../actions/post";

const initialState = {};

export default function postsReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_POST:
      const newState = [...state];
      newState.push(action.payload);
      return newState;
    case GET_POSTS:
      return action.payload;
    case LIKE_POST:
      return state.map((post) => {
        if (post._id === action.payload.userId) {
          return {
            ...post,
            likers: [action.payload.userId, ...post.likers],
          };
        }
        return post;
      });
    case UPDATE_POST:
      return state.map((post) => {
        if (post._id === action.payload.userId) {
          return {
            ...post,
            message: action.payload.message,
          };
        } else return post;
      });
    case DELETE_POST:
      return state.filter((post) => post._id !== action.payload.userId);
    case EDIT_COMMENT:
      return state.map((post) => {
        if (post._id === action.payload.postId) {
          post.comments = [...action.payload.newComment];
        }
        return post;
      });
    case DELETE_COMMENT:
      return state.map((post) => {
        if (post._id === action.payload.userId) {
          return {
            ...post,
            comments: post.comments.filter(
              (comment) => comment._id !== action.payload.commentId
            ),
          };
        } else return post;
      });
    default:
      return state;
  }
}
