import React, { createContext, useCallback, useState } from "react";

const GameContext = createContext({});

const url = "https://ahorcado-tdd.herokuapp.com";

const GameProvider = ({ children }) => {
  const [name, setname] = useState();
  const [vidas, setvidas] = useState();
  const [gameState, setGameState] = useState({});
  const [errorLogin, setErrorLogin] = useState("");

  const [result, setresult] = useState("");

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
    console.log(state);
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

  // {
  //   "name": "Agustin",
  //   "palabra": "pato",
  //   "vidas": 6,
  //   "resultado": [
  //     "_",
  //     "_",
  //     "_",
  //     "_"
  //   ],
  //   "letras_erroneas": [],
  //   "letter": "a"
  // }
  const tryletter = async (
    letter,
    palabra,
    vidas,
    resultado,
    letras_erroneas
  ) => {
    console.log(letter, palabra, vidas, resultado, letras_erroneas);
    console.log("antes");
    console.log(gameState);
    const data = {
      name: name,
      palabra: palabra,
      vidas: vidas,
      resultado: resultado,
      letras_erroneas: letras_erroneas,
      letter: letter,
    };
    const response = await fetch(`${url}/letter`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const state = await response.json();
    console.log(state);
    if (state.detail) {
      setGameState(gameState);
      if (state.detail === "letra repetida") {
        alert("Letra repetida");
      } else if (state.detail === "ganaste") {
        setresult("ganaste");
      } else if (state.detail === "perdiste") {
        setvidas(0);
        setresult("perdiste");
      }
    } else {
      setGameState(state);
      console.log("desp");
      console.log(gameState);
      console.log(state);
      setvidas(state.vidas);
    }
  };
  // const tryletter = useCallback(
  //   async (letter, palabra, vidas, resultado, letras_erroneas) => {
  //     console.log(letter, palabra, vidas, resultado, letras_erroneas);
  //     console.log("antes");
  //     console.log(gameState);
  //     const data = {
  //       name: name,
  //       palabra: palabra,
  //       vidas: vidas,
  //       resultado: resultado,
  //       letras_erroneas: letras_erroneas,
  //       letter: letter,
  //     };
  //     const response = await fetch(`${url}/letter`, {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(data),
  //     });
  //     const state = await response.json();
  //     console.log(state);
  //     if (state.detail) {
  //       setGameState(gameState);
  //       if (state.detail === "letra repetida") {
  //         alert("Letra repetida");
  //       } else if (state.detail === "ganaste") {
  //         setresult("ganaste");
  //       } else if (state.detail === "perdiste") {
  //         setvidas(0);
  //         setresult("perdiste");
  //       }
  //     } else {
  //       setGameState(state);
  //       console.log("desp");
  //       console.log(gameState);
  //       console.log(state);
  //       setvidas(state.vidas);
  //     }
  //   },
  //   [name]
  // );

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
