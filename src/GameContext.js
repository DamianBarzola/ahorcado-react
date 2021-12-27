import React, { createContext, useCallback, useState } from "react";

const GameContext = createContext({});

const url = "http://localhost:8000";

const GameProvider = ({ children }) => {
  const [name, setname] = useState();
  const [vidas, setvidas] = useState();
  const [errorLogin, setErrorLogin] = useState("");

  const [result, setresult] = useState("");

  const [gameState, setGameState] = useState(null);

  const start = useCallback(async (newname) => {
    const data = {
      name: newname,
    };
    const response = await fetch(`${url}/start`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const state = await response.json();
    if (state.detail) {
      setErrorLogin(state.detail);
    } else {
      setresult("");
      setErrorLogin("");
      setvidas(state.vidas);
      setGameState(state);
      setname(state.name);
    }
  }, []);

  const tryletter = useCallback(
    async (letter) => {
      const data = {
        name: name,
        letter: letter,
      };
      const response = await fetch(`${url}/letter`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const state = await response.json();
      if (state.respuesta) {
        if (state.respuesta === "letra repetida") {
          alert("Letra repetida");
        } else if (state.respuesta === "ganaste") {
          setresult("ganaste");
        } else if (state.respuesta === "perdiste") {
          setvidas(0);
          setresult("perdiste");
        }
      } else {
        setvidas(state.vidas);
        setGameState(state);
      }
    },
    [name]
  );

  const reset = useCallback(async () => {
    const data = {
      name: name,
    };
    const response = await fetch(`${url}/reset`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const state = await response.json();
    start(name);
  }, [name]);

  const logout = useCallback(async () => {
    const data = {
      name: name,
    };
    const response = await fetch(`${url}/reset`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
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
        errorLogin,
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
