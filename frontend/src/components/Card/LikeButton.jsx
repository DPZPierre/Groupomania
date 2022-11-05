import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { likePost, removeLike } from "../../actions/post";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";


const LikeButton = ({ post }) => {
  const userId = useSelector((state) => state.user._id);
  const dispatch = useDispatch();

  function clickEvent() {
    if(post.likers.includes(userId)) return dispatch(removeLike(post._id, userId))
    dispatch(likePost(post._id, userId))
  }

  return (
    <div className="like__container">
      <FontAwesomeIcon className="icon--like"  icon={faThumbsUp} onClick={clickEvent} alt="like/dislike"/>
        <span>{post.likers.length}</span>
    </div>
  );
};

export default LikeButton;