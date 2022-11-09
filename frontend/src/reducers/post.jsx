import {
  ADD_POST,
  DELETE_COMMENT,
  DELETE_POST,
  ADD_COMMENT,
  EDIT_COMMENT,
  GET_POSTS,
  LIKE_POST,
  UPDATE_POST,
  REMOVE_LIKE,
} from "../actions/post";

const initialState = {};

export default function postsReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_POST:
      const newState = [...state];
      newState.splice(0, 0, action.payload);
      return newState;
    case GET_POSTS:
      return action.payload;
    case ADD_COMMENT:
      return action.payload;
    case LIKE_POST:
      return state.map((post) => {
        const newPost = {...post}
        if (post._id === action.payload.postId) newPost.likers.push(action.payload.userId)
        
        return newPost;
      });
      case REMOVE_LIKE:
      return state.map((post) => {
        const newPost = {...post}
        if (post._id === action.payload.postId) newPost.likers.splice(newPost.likers.findIndex((like) => like === action.payload.userId),1)
        return newPost;       
      });
    case UPDATE_POST:
      return state.map((post) => {
        const newPost = {...post}
        if (post._id === action.payload.postId) {
          newPost.message = action.payload.message
          newPost.picture = action.payload.newPictureUrl
        } 
        return newPost;
      });
    case DELETE_POST:
      return state.filter((post) => post._id !== action.payload.postId);
    case EDIT_COMMENT:
      return state.map((post) => {
        if (post._id === action.payload.postId) {
          post.comments = [...action.payload.newComment];
        }
        return post;
      });
    case DELETE_COMMENT:
      return state.map((post) => {
        if (post._id === action.payload.postId) {
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
