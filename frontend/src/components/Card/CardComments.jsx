import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addComment } from "../../actions/post";
import { isEmpty, timestampParser } from "../Utils";
import EditDeleteComment from "./EditDeleteComment";

const CardComments = ({ post }) => {
  const [text, setText] = useState("");
  const userData = useSelector((state) => state.user);
  const usersData = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const handleComment = (e) => {
    e.preventDefault();

    if (text) {
      dispatch(addComment(post._id, userData._id, text, userData.email))
    }
  };

  return (
    <div className="comment__container">
      {post.comments.map((comment) => {
        return (
          <div
            className={
              comment.commenterId === userData._id
                ? "comment__container--client"
                : "comment__container"
            }
            key={comment._id}
          >
            <div className="comment__container__header">
              <p className="comment__container__header--email">
              {!isEmpty(usersData[0]) &&
                      usersData.map((user) => {
                        if (user._id === comment.commenterId)
                          return user.email;
                        else return null;
                      })}
              </p>
              <span className="comment__container__header--date">
                {timestampParser(comment.timestamp)}
              </span>
            </div>
            <p className="comment__container__post">{comment.text}</p>
            <EditDeleteComment comment={comment} postId={post._id} />
          </div>
        );
      })}
      {userData._id && (
        <form action="" onSubmit={handleComment} className="comment__form">
          <input
            name="text"
            id="text"
            aria-label="commentaire"
            onChange={(e) => setText(e.target.value)}
            value={text}
            placeholder="Laisser un commentaire"
          />
          <br />
          <button className="btn__post--send">Envoyer</button>
        </form>
      )}
    </div>
  );
};

export default CardComments;
