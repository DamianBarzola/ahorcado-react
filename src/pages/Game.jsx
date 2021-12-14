import React from "react";
import Hangman from "../components/Hangman";

const Game = () => {
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
              <Hangman />
              <div className="mt-2">
                <h4>Letras Incorrectas</h4>
                <h5>asd</h5>
              </div>
            </div>
          </div>
          <div className="col d-flex align-items-center m-2">
            <div className="row text-center">
              <h1 className="">_ _ _ _ _ </h1>
              <form className="mt-5 p-3 center">
                <h5>Ingrese una letra</h5>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Letra"
                  aria-describedby="basic-addon1"
                  style={{
                    width: "50%",
                    marginLeft: "25%",
                  }}
                />
                <button
                  type="submit"
                  className="btn btn-primary mt-3"
                  style={{
                    width: "30%",
                  }}
                >
                  Probar
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;
