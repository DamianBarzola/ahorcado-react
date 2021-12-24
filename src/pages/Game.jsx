import React, { useContext, useState } from "react";
import Hangman from "../components/Hangman";
import { GameContext } from "../GameContext";

const Game = () => {
  const [letter, setletter] = useState("");
  const { gameState, tryletter, result, reset, logout, vidas } =
    useContext(GameContext);
  const { resultado, letras_erroneas, palabra } = gameState;

  const letterOnChange = (e) => {
    setletter(e.target.value);
  };

  return (
    <div className="pt-5">
      <div
        style={{
          border: "2px solid #ccc",
          borderRadius: "10px",
          display: "flex",
          justifyContent: "center",
          padding: "6% 0",
          boxShadow: "1px 1px 100px 0px rgba(0,0,0,0.5)",

          backgroundColor: "white",
        }}
      >
        <div className="row">
          <div className="col d-flex justify-content-center">
            <div className="text-center">
              <Hangman vidas={vidas} />
              <div className="mt-2">
                <h4>Letras Incorrectas</h4>
                <h6 id="letrasIncorrectas">
                  {letras_erroneas.length !== 0
                    ? letras_erroneas.join(" ")
                    : "Ninguna"}
                </h6>
              </div>
            </div>
          </div>
          <div className="col d-flex align-items-center m-2">
            {result === "" ? (
              <div className="row text-center">
                <h1 id="palabra">{resultado.join(" ")} </h1>
                <div className="mt-5 p-3 center">
                  <h5>Ingrese una letra</h5>
                  <input
                    type="text"
                    id="inputLetter"
                    className="form-control"
                    placeholder="Letra"
                    aria-describedby="basic-addon1"
                    maxLength="1"
                    value={letter}
                    onChange={letterOnChange}
                    style={{
                      width: "50%",
                      marginLeft: "25%",
                    }}
                  />
                  <button
                    className="btn btn-primary mt-3"
                    id="btnTry"
                    style={{
                      width: "30%",
                    }}
                    onClick={() => {
                      if (letter !== "" && letter.length === 1)
                        tryletter(letter);
                    }}
                  >
                    Probar
                  </button>
                </div>
              </div>
            ) : (
              <h1>
                {" "}
                <div className="row text-center">
                  <h1 id="gameState">
                    {result === "perdiste" ? (
                      <b>Perdiste :( </b>
                    ) : (
                      <b>Ganaste :)</b>
                    )}
                  </h1>
                  <h4 className="mt-5">La palabra era</h4>
                  <h1 className="">{palabra} </h1>
                  <div className="mt-3 p-3 center">
                    <div>
                      <button
                        id="btnReset"
                        className="btn btn-primary mt-3"
                        style={{
                          width: "30%",
                        }}
                        onClick={() => reset()}
                      >
                        Volver a Jugar
                      </button>
                    </div>
                    <button
                      id="btnLogout"
                      className="btn btn-secondary mt-3"
                      style={{
                        width: "30%",
                      }}
                      onClick={() => logout()}
                    >
                      Salir
                    </button>
                  </div>
                </div>
              </h1>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;
