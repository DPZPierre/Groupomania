import React from 'react';
import { useState } from 'react';
import Login from '../components/Log/Login';
import SignUp from '../components/Log/SignUp';

const Connection = () => {
    const [signUp, setSignUp] = useState(true);

    return (
        <div className="connect__modal__container">
            <div className="connect__modal__container__btn">
                <button
                    style={{ background: signUp ? "rgb(83, 83, 83)" : "rgb(28, 28, 28)" }}
                    onClick={() => setSignUp(true)}
                >
                    S'inscrire
                </button>
                <button
                    style={{ background: signUp ? "rgb(28, 28, 28)" : "rgb(83, 83, 83)" }}
                    onClick={() => setSignUp(false)}
                >
                    Se connecter
                </button>
            </div>
            {signUp ? <SignUp /> : <Login /> }
        </div>
    );
};

export default Connection;