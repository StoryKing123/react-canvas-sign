import { useRef } from "react";
import "./App.css";
// import Canvas from "react-canvas-sign";
import Canvas from "./index";
// import Canvas from "../dist/react-canvas.es";

function App() {
  const canvasRef = useRef<any>(null);

  return (
    <div className="App">
      <button
        onClick={() => {
          console.log(canvasRef.current.undo());
        }}
      >
        undo
      </button>
      {/* <button
        onClick={() => {
          handleClear();
        }}
      >
        empty
      </button>
      <button
        onClick={() => {
          handleSave();
        }}
      >
        save
      </button> */}
      <Canvas
        ref={canvasRef}
        height={400}
        width={800}
        contextProps={{}}
      ></Canvas>
    </div>
  );
}

export default App;
