import Login from "./pages/Login";
import Game from "./pages/Game";
import "./App.css";
import { useContext } from "react";
import { GameContext } from "./GameContext";

function App() {
  const { name, result } = useContext(GameContext);
  const renderView = () => {
    if (!name) return <Login />;
    return <Game />;
  };
  return (
    <>
      <div
        style={{
          marginTop: "4%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {renderView()}
      </div>
    </>
  );
}

export default App;
