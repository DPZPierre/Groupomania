import React, { useContext, useEffect, useState } from "react";
import { UidContext } from "../AppContext";
import { useDispatch } from "react-redux";
import { likePost, removeLike } from "../../actions/post";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";


const LikeButton = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const [dislike, setDislike] =useState(false);
  const uid = useContext(UidContext);
  const dispatch = useDispatch();

  const like = () => {
    dispatch(likePost(post._id, uid))
    setLiked(true);
  };

  const removeLikePost = () => {
    dispatch(removeLike(post._id, uid))
    setDislike(true);
  };

  useEffect(() => {
    if (post.likers.includes(uid)) setLiked(true);
    else setLiked(false);
  }, [uid, post.likers, liked]);

  useEffect(() => {
    if(post.likers === true) setDislike(true);
    else setDislike(false);
  }, [uid, post.likers, dislike])

  function clickEvent() {
   liked ? removeLikePost() : like()
  }

  return (
    <div className="like__container">
      <FontAwesomeIcon className="icon--like"  icon={faThumbsUp} onClick={clickEvent} alt="like/dislike"/>
        <span>{post.likers.length}</span>
    </div>
  );
};

export default LikeButton;