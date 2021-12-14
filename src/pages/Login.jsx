import React, { useContext, useState } from "react";
import { GameContext } from "../GameContext";

const Login = () => {
  const [name, setname] = useState("");
  const { start, error } = useContext(GameContext);

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
            <img
              src="https://play-lh.googleusercontent.com/DX1AaUhjPz0WcH9ujjKf4J-295g1baIig0wAl2J8ZeUxIe6jRYZlwbTpkI6idgpA_g"
              height="150px"
              alt="Logo"
            />
          </div>
          <h3>Bienvenido al Ahorcado</h3>
          <h5>Nombre</h5>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={nameOnChange}
          />
          <button
            className="btn btn-primary"
            id="loginBtn"
            onClick={() => start(name)}
          >
            Ingresar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
