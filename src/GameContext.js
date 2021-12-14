import React, { createContext, useCallback, useState } from "react";

const GameContext = createContext({});

const url = "http://localhost:8000";

const GameProvider = ({ children }) => {
  const [name, setname] = useState();

  const [error, setError] = useState();

  const [gameState, setGameState] = useState(null);

  const start = useCallback(async (newname) => {
    const response = await fetch(`${url}/start?nick=${newname}`, {
      method: "POST",
    });
    const state = await response.json();
    setname(state.name);
    setGameState(state);
  }, []);

  return (
    <GameContext.Provider
      value={{
        name,
        error,
        gameState,
        start,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export { GameContext, GameProvider };
