import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const emailError = document.querySelector(".email__error");
    const passwordError = document.querySelector(".password__error");

    emailError.innerHTML = "";
    passwordError.innerHTML = "";

    axios({
      method: "post",
      url: "http://localhost:3000/api/auth/login",
      withCredentials: true,
      data: {
        email,
        password,
      },
    })
      .then((response) => {
        console.log(response)
        if (response.data.errors) {
          emailError.innerHTML = response.data.errors.email;
          passwordError.innerHTML = response.data.errors.password;
          
        } else {
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
      <div className="email__error"></div>
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
      <div className="password__error"></div>
      <br />
      <input type="submit" value="Se connecter" />
    </form>
  );
};

export default Login;
