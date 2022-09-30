import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPost } from "../../actions/post";
import { isEmpty, timestampParser } from "../Utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";

const NewPostForm = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [postPicture, setPostPicture] = useState(null);
  const [setFile] = useState();
  const userData = useSelector((state) => state.user);
  const error = useSelector((state) => state.errors);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isEmpty(userData)) setIsLoading(false);
  }, [userData]);

  const handlePicture = (event) => {
    setPostPicture(URL.createObjectURL(event.target.files[0]));
    setFile(event.target.files[0]);
  };

  const handlePost = async () => {
    if (message || postPicture) {
        
      await dispatch(addPost({userId: userData._id, message }));
      cancelPost();
    }
  };

  const cancelPost = () => {
    setMessage("");
    setPostPicture("");
    setFile("");
  };

  return (
    <div className="post__container">
      {isLoading ? (
        <i className="post__container--spinner"></i>
      ) : (
        <>
          <div className="post__form">
            <textarea
              name="text"
              id="text"
              placeholder="Ecrire un nouveau message"
              onChange={(e) => setMessage(e.target.value)}
              value={message}
            />
            {message || postPicture ? (
              <div className="post__form__card">
                 <h3 className="post__form__card--email">{userData.email}</h3>
                  <div className="post__form__card--header">
                    <span>{timestampParser(Date.now())}</span>
                  </div>
                  <div className="content">
                    <p>{message}</p>
                    <img src={postPicture} alt="" />
                  </div>
             
              </div>
            ) : null}
            <div className="post__form__footer">
              <div className="post__form__footer--icon">
                <FontAwesomeIcon className="icon__upload" icon={faUpload} alt="user post" />
                <form action="/images" encType="multipart/form-data" method="post">
                <input
                  className="post__form__footer__input"
                  type="file"
                  id="file-upload"
                  name="file"
                  accept=".jpg, .jpeg, .png, .gif"
                  onChange={(event) => handlePicture(event)}
                />
                </form>
              </div>
              {!isEmpty(error.format) && <p>{error.format}</p>}
              <div className="btn__post">
                {message || postPicture ? (
                  <button className="btn__post--cancel" onClick={cancelPost}>
                    Annuler
                  </button>
                ) : null}
                <button className="btn__post--send" onClick={handlePost}>
                  Envoyer
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default NewPostForm;