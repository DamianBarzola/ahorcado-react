import React, { createContext, useCallback, useState } from "react";

const GameContext = createContext({});

const url = "http://localhost:8000";

const GameProvider = ({ children }) => {
  const [name, setname] = useState();
  const [vidas, setvidas] = useState();

  const [result, setresult] = useState("");

  const [gameState, setGameState] = useState(null);

  const start = useCallback(async (newname) => {
    const response = await fetch(`${url}/start?nick=${newname}`, {
      method: "POST",
    });
    const state = await response.json();
    setresult("");
    console.log(state.vidas);
    setvidas(state.vidas);
    setGameState(state);
    setname(state.name);
  }, []);

  const tryletter = useCallback(
    async (letter) => {
      const response = await fetch(
        `${url}/letter?nick=${name}&letter=${letter}`,
        {
          method: "POST",
        }
      );
      const state = await response.json();
      if (state.respuesta) {
        if (state.respuesta === "letra repetida") {
          console.log(state);
          alert("Letra repetida");
        } else if (state.respuesta === "ganaste") {
          setresult("ganaste");
        } else if (state.respuesta === "perdiste") {
          setvidas(0);
          setresult("perdiste");

          console.log(state);
        }
      } else {
        console.log(state);
        setvidas(state.vidas);
        setGameState(state);
      }
    },
    [name]
  );

  const reset = useCallback(async () => {
    const response = await fetch(`${url}/reset?nick=${name}`, {
      method: "POST",
    });
    const state = await response.json();
    start(name);
  }, [name]);

  const logout = useCallback(async () => {
    const response = await fetch(`${url}/reset?nick=${name}`, {
      method: "POST",
    });
    const state = await response.json();
    setresult("");
    setname();
    setGameState(null);
  }, [name]);

  return (
    <GameContext.Provider
      value={{
        name,
        vidas,
        gameState,
        result,
        reset,
        start,
        tryletter,
        logout,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export { GameContext, GameProvider };
