import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPost, getPosts } from "../../actions/post";
import { isEmpty, timestampParser } from "../Utils";

const NewPostForm = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [postPicture, setPostPicture] = useState(null);
  const [file, setFile] = useState();
  const userData = useSelector((state) => state.user);
  const error = useSelector((state) => state.errors);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isEmpty(userData)) setIsLoading(false);
  }, [userData]);
  console.log(userData)



  const handlePicture = (event) => {
    setPostPicture(URL.createObjectURL(event.target.files[0]));
    setFile(event.target.files[0]);
  };

  const handlePost = async () => {
    if (message || postPicture) {
      const data = new FormData();
      data.append("userId", userData._id);
      data.append("post", message);
      if (file) data.append("file", file);

      await dispatch(addPost(data));
      dispatch(getPosts());
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
              <div className="post__form__footer__icon">
                <img src="" alt="user post" />
                <input
                  type="file"
                  id="file-upload"
                  name="file"
                  accept=".jpg, .jpeg, .png, .gif"
                  onChange={(event) => handlePicture(event)}
                />
              </div>
              {!isEmpty(error.format) && <p>{error.format}</p>}
              <div className="btn-send">
                {message || postPicture ? (
                  <button className="cancel" onClick={cancelPost}>
                    Annuler
                  </button>
                ) : null}
                <button className="send" onClick={handlePost}>
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