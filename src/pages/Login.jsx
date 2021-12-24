import React, { useContext, useState } from "react";
import { GameContext } from "../GameContext";

import logo from "../images/logo.png";

const Login = () => {
  const [name, setname] = useState("");
  const { start, errorLogin } = useContext(GameContext);

  const nameOnChange = (e) => {
    setname(e.target.value);
  };

  return (
    <div className="d-flex justify-content-center ">
      <div
        style={{
          border: "2px solid #ccc",
          borderRadius: "10px",
          padding: "30px",
          margin: "10px",
          minWidth: "250px",
          boxShadow: "1px 1px 100px 0px rgba(0,0,0,0.5)",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "auto",
            justifyContent: "center",
            rowGap: "10px",
          }}
        >
          <div className="d-flex justify-content-center text-center">
            <img src={logo} height="150px" alt="Logo" />
          </div>
          <h3>Bienvenido al Ahorcado</h3>
          <h5>Nombre</h5>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={nameOnChange}
            minLength="2"
            maxLength="30"
          />
          <button
            className="btn btn-primary"
            id="loginBtn"
            onClick={() => {
              if (name !== "" && name.length >= 1 && name.length <= 30)
                start(name);
            }}
          >
            Ingresar
          </button>
          {errorLogin !== "" && (
            <h6 className="text-danger mt-2 " id="errorLogin">
              {errorLogin}
            </h6>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
