import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPost } from "../../actions/post";
import { isEmpty, timestampParser } from "../Utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";

const NewPostForm = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [picture, setPicture] = useState(null);

  const userData = useSelector((state) => state.user);
  const error = useSelector((state) => state.errors);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isEmpty(userData)) setIsLoading(false);
  }, [userData]);

  const handlePicture = (event) => {
    console.log(event.target.files[0]);
    setPicture(event.target.files[0]);
  };

  const handlePost = async (e) => {
    e.preventDefault();
    if (message || picture) {
      await dispatch(addPost({ userId: userData._id, message, picture }));
      cancelPost();
    }
    if (!message) {
      return alert("Votre message est vide");
    }
  };

  const cancelPost = () => {
    setMessage("");
    setPicture("");
  };

  return (
    <div className="post__container">
      {isLoading ? (
        <i className="post__container--spinner"></i>
      ) : (
        <>
          <div className="post__form">
            <textarea
              aria-label="post container"
              name="text"
              id="text"
              placeholder="Ecrire un nouveau message"
              onChange={(e) => setMessage(e.target.value)}
              value={message}
            />
            {message || picture ? (
              <div className="post__form__card">
                <h3 className="post__form__card--email">{userData.email}</h3>
                <div className="post__form__card--header">
                  <span>{timestampParser(Date.now())}</span>
                </div>
                <div className="content">
                  <p>{message}</p>
                  <img className="post__picture" src={picture} alt="" />
                </div>
              </div>
            ) : null}
            <div className="post__form__footer">
              
                <form
                  action="/"
                  encType="multipart/form-data"
                  method="post"
                  onSubmit={handlePost}
                >
                <div className="post__form__footer--icon">
                <FontAwesomeIcon
                  className="icon__upload"
                  icon={faUpload}
                  alt="upload icon"
                />
                  <input
                    aria-label="picture input"
                    className="post__form__footer__input"
                    type="file"
                    id="file-upload"
                    name="picture"
                    accept=".jpg, .jpeg, .png, .gif"
                    onChange={(event) => handlePicture(event)}
                  />
                  {!isEmpty(error.format) && <p>{error.format}</p>}
                  </div>
                  <div className="btn__post">
                    {message || picture ? (
                      <button
                        className="btn__post--cancel"
                        onClick={cancelPost}
                      >
                        Annuler
                      </button>
                    ) : null}
                  
                  <button
                    type="submit"
                    className="btn__post--send"
                    onClick={handlePost}
                  >
                    Envoyer
                  </button>
                  </div>
                </form>
              
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default NewPostForm;
