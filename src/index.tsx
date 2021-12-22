import React, {
  FC,
  forwardRef,
  RefObject,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";
import { useEvent } from "./utils";
type CanvasProps = {
  contextProps?: Partial<CanvasRenderingContext2D>;
  width: number;
  height: number;
  className?: string;
};

type Ref = {
  canvasRef: RefObject<HTMLCanvasElement>;
  undo: () => void;
  clear: () => void;
  save: () => void;
};
const Canvas = forwardRef<Ref, CanvasProps>((props, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isPainting = useRef<Boolean>(false);
  let steps: ImageData[] = [];
  const defaultLineStyle = {
    strokeStyle: "black",
    lineWidth: 2,
    shadowBlur: "1",
    lineCap: "round",
    shadowColor: "black", // 边缘颜色
    lineJoin: "round",
  };

  useImperativeHandle(ref, () => ({
    canvasRef: canvasRef,
    undo: handleUnDo,
    clear: handleClear,
    save: handleSave,
  }));

  const getContextByRef = () => {
    const canvasElement = getCanvasByRef();
    if (!canvasElement) {
      throw Error();
    }
    const context = canvasElement.getContext("2d") as CanvasRenderingContext2D;
    if (!context) {
      throw Error();
    }
    return context;
  };
  const getCanvasByRef = () => {
    const canvasElement = canvasRef.current as HTMLCanvasElement;
    if (!canvasElement) {
      throw Error();
    }
    return canvasElement;
  };
  const handleMouseMove = (e: MouseEvent) => {
    const canvasElement = getCanvasByRef();
    draw(e.pageX - canvasElement.offsetLeft, e.pageY - canvasElement.offsetTop);
  };
  const handleMouseUp = (e: MouseEvent) => {
    endDraw();
  };
  const handleMouseDown = (e: MouseEvent) => {
    const canvasElement = getCanvasByRef();
    const context = getContextByRef();
    isPainting.current = true;
    handleStyleInit();
    context.beginPath();
    context.moveTo(
      e.pageX - canvasElement.offsetLeft,
      e.pageY - canvasElement.offsetTop
    );
  };
  const handleMouseLeave = (e: MouseEvent) => {
    isPainting.current = false;
  };

  const handleTouchStart = (e: TouchEvent) => {
    e.preventDefault();
    const canvasElement = getCanvasByRef();
    beforeDraw(
      e.changedTouches[0].pageX - canvasElement.offsetLeft,
      e.changedTouches[0].pageY - canvasElement.offsetTop
    );
  };

  const handleTouchMove = (e: TouchEvent) => {
    e.preventDefault();
    const canvasElement = getCanvasByRef();
    draw(
      e.changedTouches[0].pageX - canvasElement.offsetLeft,
      e.changedTouches[0].pageY - canvasElement.offsetTop
    );
  };
  const handleTouchEnd = (e: TouchEvent) => {
    e.preventDefault();
    endDraw();
  };
  const beforeDraw = (x: number, y: number) => {
    const context = getContextByRef();
    isPainting.current = true;
    handleStyleInit();
    context.beginPath();
    context.moveTo(x, y);
  };
  const draw = (x: number, y: number) => {
    if (!isPainting.current) {
      return;
    }
    const context = getContextByRef();
    context.lineTo(x, y);
    context.stroke();
  };
  const endDraw = () => {
    isPainting.current = false;
    const context = getContextByRef();
    const canvasElement = getCanvasByRef();
    steps.push(
      context.getImageData(
        0,
        0,
        canvasElement.offsetWidth,
        canvasElement.offsetHeight
      )
    );
    context.closePath();
  };
  const handleUnDo = () => {
    const context = getContextByRef();
    if (steps.length <= 1) {
      handleClear();
      return;
    }
    steps.pop();
    context.putImageData(steps[steps.length - 1], 0, 0);
  };
  const handleClear = () => {
    const canvasElement = getCanvasByRef();
    const context = getContextByRef();
    context.clearRect(
      0,
      0,
      canvasElement.offsetWidth,
      canvasElement.offsetHeight
    );
    steps = [];
  };

  const handleStyleInit = () => {
    const context: Record<string, any> = getContextByRef();
    const contextProps: Record<string, any> = {
      ...defaultLineStyle,
      ...props.contextProps,
    };
    for (let key in contextProps) {
      context[key] = contextProps[key]!;
    }
  };

  const handleSave = () => {
    const canvasElement = getCanvasByRef();
    const a = document.createElement("a");
    a.download = "canvas.png";
    a.href = canvasElement.toDataURL("image/png");
    a.dispatchEvent(new MouseEvent("click"));
  };

  useEvent<HTMLCanvasElement>(canvasRef, {
    mousemove: handleMouseMove,
    mousedown: handleMouseDown,
    mouseup: handleMouseUp,
    mouseleave: handleMouseLeave,
    touchstart: handleTouchStart,
    touchmove: handleTouchMove,
    touchend: handleTouchEnd,
  });

  return (
    <div className="App">
      <canvas
        className={props.className}
        ref={canvasRef}
        width={props.width}
        height={props.height}
      ></canvas>
    </div>
  );
});

export default Canvas;
