import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async(e) => {
    e.preventDefault();
    const loginError = document.querySelector(".login.error");
 

    loginError.innerHTML = "";


    await axios({
      method: "post",
      url: "http://localhost:3000/api/auth/login",
      withCredentials: true,
      data: {
        email,
        password,
      },
    })
    .then((res) => {

          window.location = "/Home";
        
      })
      .catch((err) => {
        loginError.innerHTML = err.response.data.error;
        console.log(err);
      });
  };

  return (
    <form action="" onSubmit={handleLogin} id="signup__form">
      <label htmlFor="email">Email</label>
      <br />
      <input
        type="text"
        name="email"
        id="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <br />
      <label htmlFor="password">Mot de passe</label>
      <br />
      <input
        type="password"
        name="password"
        id="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <div className="login error"></div>
      <br />
      <input type="submit" value="Se connecter" />
    </form>
  );
};

export default Login;
