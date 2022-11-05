import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dateParser, isEmpty } from "../Utils";
import LikeButton from "./LikeButton";
import { updatePost } from "../../actions/post";
import DeleteCard from "./DeleteCard";
import CardComments from "./CardComments";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { faUpload } from "@fortawesome/free-solid-svg-icons";

const Card = ({ post }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdated, setIsUpdated] = useState(false);
  const [textUpdate, setTextUpdate] = useState(null);
  const [pictureUpdate, setPictureUpdate] = useState(null);
  const [showComments, setShowComments] = useState(false);
  const usersData = useSelector((state) => state.users);
  const userData = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    !isEmpty(usersData[0]) && setIsLoading(false);
  }, [usersData]);

  const handlePicture = (event) => {
    setPictureUpdate(event.target.files[0]);
  };

  const updateItem = async (e) => {
    e.preventDefault();
    if (textUpdate || pictureUpdate) {
      await dispatch(updatePost(post._id, textUpdate, pictureUpdate));
    }
    setIsUpdated(false);
  };

  return (
    <li className="card" key={post._id}>
      {isLoading ? (
        <i className="card--spinner"></i>
      ) : (
        <>
          <div className="card__container">
            <div className="card__container__header">
              {!isEmpty(usersData[0]) &&
                usersData.map((user) => {
                  if (user._id === post.userId) return user.email;
                  else return null;
                })}
              <div>
                <span className="card__container__header__date">
                  {dateParser(post.createdAt)}
                </span>
              </div>
            </div>
            {isUpdated === false && (
              <p className="card__container__post">{post.message}</p>
            )}
            {isUpdated && (
              <div className="card__container__post__update">
                <textarea
                  defaultValue={post.message}
                  onChange={(e) => setTextUpdate(e.target.value)}
                />
                <div className="card__container__post__update__button">
                  <button className="btn__update" onClick={updateItem}>
                    Valider modification
                  </button>
                </div>
              </div>
            )}
            {post.picture && (
              <img src={post.picture} alt="card-pic" className="card-pic" />
            )}
            {userData._id === post.userId && (
              <div className="card__container__post__update__button__update__delete">
                <div onClick={() => setIsUpdated(!isUpdated)}>
                  <FontAwesomeIcon
                    className="icon__pen"
                    icon={faPen}
                    alt="edit"
                  />
                  <form
                    encType="multipart/form-data"
                    onSubmit={updateItem}
                  >
                    <div className="card__container__post--icon">
                      <FontAwesomeIcon
                        className="icon__upload"
                        icon={faUpload}
                        alt="upload icon"
                      />
                      <input
                        aria-label="picture input"
                        className="card__container__post__input"
                        type="file"
                        id="file-upload"
                        name="picture"
                        accept=".jpg, .jpeg, .png, .gif"
                        onChange={(event) => handlePicture(event)}
                      />
                    </div>
                  </form>
                </div>
                <DeleteCard id={post._id} />
              </div>
            )}
            <div className="card__container__footer">
              <div className="card__container__footer--commentIcon">
                <FontAwesomeIcon
                  className="icon"
                  icon={faComment}
                  onClick={() => setShowComments(!showComments)}
                  src=""
                  alt="comment"
                />
                <span>{post.comments.length}</span>
              </div>
              <LikeButton post={post} />
            </div>
            {showComments && <CardComments post={post} />}
          </div>
        </>
      )}
    </li>
  );
};

export default Card;
