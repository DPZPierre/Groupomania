import React, { useState } from "react";
import axios from "axios";
import Login from "./Login";
import { useEffect } from "react";

const SignUp = () => {
  const [formSubmit, setFormSubmit] = useState("");
  const [email, setEmail] = useState("");
  const [controlEmail, setControlEmail] = useState("");
  const [password, setPassword] = useState("");
  const [controlPassword, setControlPassword] = useState("");
  const [userRole, setRole] = useState(null);

  useEffect(
    () => {
      axios.get('http://localhost:3000/api/role')
      .then((res) => {
        setRole(res.data.roles)
      })
      .catch((err) => {
        console.log(err);
      })
    },
    [] 
  ) 

  const handleRegister = async (e) => {
    e.preventDefault();
    const terms = document.getElementById("terms");
    const emailError = document.querySelector(".email.error");
    const emailConfirmError = document.querySelector(
      ".email-confirm.error"
    );
    const passwordError = document.querySelector(".password.error");
    const passwordConfirmError = document.querySelector(
      ".password-confirm.error"
    );
    const termsError = document.querySelector(".terms.error");
    
    emailConfirmError.innerHTML = "";
    passwordConfirmError.innerHTML = "";
    termsError.innerHTML = "";

   
    if (email !== controlEmail || password !== controlPassword || !terms.checked) {
      if (email !== controlEmail)
        emailConfirmError.innerHTML = 
        "Les adresses emails ne correspondent pas";
      if (password !== controlPassword)
        passwordConfirmError.innerHTML =
          "Les mots de passe ne correspondent pas";

      if (!terms.checked)
        termsError.innerHTML = "Veuillez valider les conditions générales";
    } else {
      await axios({
        method: "post",
        url: "http://localhost:3000/api/auth/signup",
        data: {
          email,
          password,
          role: userRole._id
        },
      })
        .then((res) => {
          console.log(res);
          if (res.data.errors) {
            emailError.innerHTML = res.data.errors.email;
            passwordError.innerHTML = res.data.errors.password;
          } else {
            setFormSubmit(true);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <>
      {formSubmit ? (
        <>
          <Login/>
          <span></span>
          <h4 className="success">
            Enregistrement réussi, veuillez-vous connecter
          </h4>
        </>
      ) : (
        <form action="" onSubmit={handleRegister} id="sign-up-form">
          <label htmlFor="email">Email</label>
          <br />
          <input
            type="text"
            name="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <div className="email error"></div>
          <br />
          <label htmlFor="email-conf">Confirmer email</label>
          <br />
          <input
            type="text"
            name="email"
            id="email"
            onChange={(e) => setControlEmail(e.target.value)}
            value={controlEmail}
          />
          <div className="email-confirm error"></div>
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
          <label htmlFor="password-conf">Confirmer mot de passe</label>
          <br/>
          <input
            type="password"
            name="password"
            id="password-conf"
            onChange={(e) => setControlPassword(e.target.value)}
            value={controlPassword}
          />
          <div className="password-confirm error"></div>
          <br />
          <input type="submit" value="Valider inscription" />
        </form>
      )}
    </>
  );
};

export default SignUp;