import React from "react";
import axios from "axios";
import cookie from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

const Logout = () => {
  const removeCookie = (key) => {
    if (window !== "undefined") {
      cookie.remove(key, { expires: 1 });
    }
  };

  const logout = async () => {
    await axios({
      method: "get",
      url: `http://localhost:3000/api/auth/logout`,
      withCredentials: true,
    })
      .then(() => removeCookie("jwt"))
      .catch((err) => console.log(err));

    window.location = "/";
  };

  return (
    <div onClick={logout}>
      <p className="icon__logout">Se déconnecter</p>
      <FontAwesomeIcon
        className="icon__logout--icon"
        icon={faRightFromBracket}
        alt="logout"
      />
    </div>
  );
};

export default Logout;
