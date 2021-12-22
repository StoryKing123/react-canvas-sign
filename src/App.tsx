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
          canvasRef.current.undo();
        }}
      >
        undo
      </button>
      <button
        onClick={() => {
          canvasRef.current.clear();
        }}
      >
        empty
      </button>
      {/* <button
        onClick={() => {
          handleSave();
        }}
      >
        save
      </button>  */}
      <div style={{ border: "1px solid black", display: "inline-block" }}>
        <Canvas
          ref={canvasRef}
          height={400}
          width={800}
          contextProps={{}}
        ></Canvas>
      </div>
    </div>
  );
}

export default App;
