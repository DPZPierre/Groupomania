import React from "react";
import { useDispatch } from "react-redux";
import { deletePost } from "../../actions/post";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons"

const DeleteCard = (props) => {
  const dispatch = useDispatch();

  const deleteQuote = () => {
    dispatch(deletePost(props.id));  
  }

  return (
    <div
      onClick={() => {
        if (window.confirm("Voulez-vous supprimer cet article ?")) {
          deleteQuote();
        }
      }}
    >
      <FontAwesomeIcon className="icon__trash" icon={faTrash} alt="delete" />
    </div>
  );
};

export default DeleteCard;