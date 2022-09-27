import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPost, getPosts } from "../actions/post";
import { isEmpty, timestampParser } from "./Utils";

const NewPostForm = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [post, setPost] = useState("");
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
    if (post || postPicture) {
      const data = new FormData();
      data.append("userId", userData._id);
      data.append("post", post);
      if (file) data.append("file", file);

      await dispatch(addPost(data));
      dispatch(getPosts());
      cancelPost();
    }
  };

  const cancelPost = () => {
    setPost("");
    setPostPicture("");
    setFile("");
  };

  return (
    <div className="post-container">
      {isLoading ? (
        <i className="fas fa-spinner fa-pulse"></i>
      ) : (
        <>
          <div className="post-form">
            <textarea
              name="message"
              id="message"
              placeholder="Ecrire un message"
              onChange={(event) => setPost(event.target.value)}
              value={post}
            />
            {post || postPicture ? (
              <li className="card-container">
                <div className="card-right">
                  <div className="card-header">
                    <span>{timestampParser(Date.now())}</span>
                  </div>
                  <div className="content">
                    <p>{post}</p>
                    <img src={postPicture} alt="" />
                  </div>
                </div>
              </li>
            ) : null}
            <div className="footer-form">
              <div className="icon">
                <img src="./img/icons/picture.svg" alt="user post" />
                <input
                  type="file"
                  id="file-upload"
                  name="file"
                  accept=".jpg, .jpeg, .png, .gif"
                  onChange={(event) => handlePicture(event)}
                />
              </div>
              {!isEmpty(error.format) && <p>{error.format}</p>}
              {!isEmpty(error.maxSize) && <p>{error.maxSize}</p>}
              <div className="btn-send">
                {post || postPicture ? (
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