import React, { useContext, useEffect, useState } from "react";
import { UidContext } from "../AppContext";
import { useDispatch } from "react-redux";
import { likePost, dislikePost } from "../../actions/post";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";


const LikeButton = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const uid = useContext(UidContext);
  const dispatch = useDispatch();

  const like = () => {
    dispatch(likePost(post._id, uid))
    setLiked(true);
  };

  const dislike = () => {
    dispatch(dislikePost(post._id, uid))
    setLiked(false);
  };

  useEffect(() => {
    if (post.likers.includes(uid)) setLiked(true);
    else setLiked(false);
  }, [uid, post.likers, liked]);

  return (
    <div className="like__container">
      <FontAwesomeIcon className="icon--like"  icon={faThumbsUp} onClick={like} alt="like"/>
        <span>{post.likers.length}</span>
         <FontAwesomeIcon className="icon--dislike"  icon={faThumbsDown} onClick={dislike} alt="dislike" />
    </div>
  );
};

export default LikeButton;