import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteComment, editComment } from "../../actions/post";
import { UidContext } from "../AppContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPen } from "@fortawesome/free-solid-svg-icons";

const EditDeleteComment = ({ comment, postId }) => {
  const [isAuthor, setIsAuthor] = useState(false);
  const [edit, setEdit] = useState(false);
  const [text, setText] = useState("");
  const uid = useContext(UidContext);
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user);

  const handleEdit = (e) => {
    e.preventDefault();

    if (text) {
      dispatch(editComment(postId, comment._id, text));
      setText("");
      setEdit(false);
    }
  };

  const handleDelete = () => dispatch(deleteComment(postId, comment._id));

  useEffect(() => {
    const checkAuthor = () => {
      if (uid === comment.commenterId || userData.role === "6356c63ab58b610a31d49a6b" ) {
        setIsAuthor(true); 
      }
    };
    checkAuthor();
  }, [uid, comment.commenterId, userData.role]);
  
  return (
    <div className="edit__comment">
      {isAuthor && edit === false && (
        <span onClick={() => setEdit(!edit)}>
          <FontAwesomeIcon icon={faPen} className="icon__pen" alt="edit-comment" />
        </span>
      )}
      {isAuthor && edit && (
        <form action="" onSubmit={handleEdit} className="edit__comment__form">
          <label htmlFor="text" onClick={() => setEdit(!edit)}>
            Editer
          </label>
          <br />
          <input
            type="text"
            name="text"
            onChange={(e) => setText(e.target.value)}
            defaultValue={comment.text}
          />
          <br />
          <div className="edit__comment__form__btn">
            <span
              onClick={() => {
                if (window.confirm("Voulez-vous supprimer ce commentaire ?")) {
                  handleDelete();
                }
              }}
            >
              <FontAwesomeIcon className="icon__trash" icon={faTrash} alt="delete" />
            </span>
            <button className="btn__update" onClick={handleEdit}>
              Valider modification
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default EditDeleteComment;
