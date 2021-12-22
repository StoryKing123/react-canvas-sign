import React, { RefObject } from "react";
declare type CanvasProps = {
    contextProps?: Partial<CanvasRenderingContext2D>;
    width: number;
    height: number;
    className?: string;
};
declare type Ref = {
    canvasRef: RefObject<HTMLCanvasElement>;
    undo: () => void;
    clear: () => void;
    save: () => void;
};
declare const Canvas: React.ForwardRefExoticComponent<CanvasProps & React.RefAttributes<Ref>>;
export default Canvas;
