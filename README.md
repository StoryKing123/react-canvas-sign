# react-canvas-sign

React compoent to use canvas
​

# Installation

```shell
npm i react-canvas-sign
```

# Usage

```javascript
import { useRef } from "react";
import "./App.css";
import Canvas from "react-canvas-sign";
// import Canvas from "../dist/react-canvas.es";

function App() {
  const canvasRef = useRef(null);

  return (
    <div className="App">
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

```

# Props

| **prop**     | **type** | **default** |
| ------------ | -------- | ----------- |
| contextProps | `object` |             |
| width        | `number` |             |
| height       | `number` |             |
| className    | `string` |             |

# Ref Props

| **props** | **desc**          |
| --------- | ----------------- |
| canvasRef | canvas ref        |
| undo()    | undo operation    |
| clear()   | clear operation   |
| save()    | save as png image |

