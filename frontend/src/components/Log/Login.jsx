import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const emailError = document.querySelector(".emailError");
    const passwordError = document.querySelector(".password.error");

    axios({
      method: "post",
      url: "http://localhost:3000/api/auth/login",
      withCredentials: true,
      data: {
        email,
        password,
      },
    })
      .then((res) => {
        console.log(res);
        if (res.data.error) {
          emailError.innerHTML = res.data.error;
          passwordError.innerHTML = res.data.error;
        } 
        else {
          window.location = "/Home";
        }
  })
      .catch((err) => {
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
      <div className="emailError"></div>
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
      <div className="password error"></div>
      <br />
      <input type="submit" value="Se connecter" />
    </form>
  );
};

export default Login;
