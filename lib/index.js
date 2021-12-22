var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
import require$$0, { useEffect, forwardRef, useRef, useImperativeHandle } from "react";
const useEvent = (elementRef, eventMap) => {
  if (!eventMap) {
    return;
  }
  useEffect(() => {
    const element = elementRef.current;
    if (!element) {
      return;
    }
    console.log(element);
    for (let key in eventMap) {
      element.addEventListener(key, eventMap[key]);
    }
    return () => {
      for (let key in eventMap) {
        element.removeEventListener(key, eventMap[key]);
      }
    };
  }, []);
};
var jsxRuntime = { exports: {} };
var reactJsxRuntime_production_min = {};
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;
function toObject(val) {
  if (val === null || val === void 0) {
    throw new TypeError("Object.assign cannot be called with null or undefined");
  }
  return Object(val);
}
function shouldUseNative() {
  try {
    if (!Object.assign) {
      return false;
    }
    var test1 = new String("abc");
    test1[5] = "de";
    if (Object.getOwnPropertyNames(test1)[0] === "5") {
      return false;
    }
    var test2 = {};
    for (var i = 0; i < 10; i++) {
      test2["_" + String.fromCharCode(i)] = i;
    }
    var order2 = Object.getOwnPropertyNames(test2).map(function(n2) {
      return test2[n2];
    });
    if (order2.join("") !== "0123456789") {
      return false;
    }
    var test3 = {};
    "abcdefghijklmnopqrst".split("").forEach(function(letter) {
      test3[letter] = letter;
    });
    if (Object.keys(Object.assign({}, test3)).join("") !== "abcdefghijklmnopqrst") {
      return false;
    }
    return true;
  } catch (err) {
    return false;
  }
}
shouldUseNative() ? Object.assign : function(target, source) {
  var from;
  var to = toObject(target);
  var symbols;
  for (var s = 1; s < arguments.length; s++) {
    from = Object(arguments[s]);
    for (var key in from) {
      if (hasOwnProperty.call(from, key)) {
        to[key] = from[key];
      }
    }
    if (getOwnPropertySymbols) {
      symbols = getOwnPropertySymbols(from);
      for (var i = 0; i < symbols.length; i++) {
        if (propIsEnumerable.call(from, symbols[i])) {
          to[symbols[i]] = from[symbols[i]];
        }
      }
    }
  }
  return to;
};
/** @license React v17.0.2
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var f = require$$0, g = 60103;
reactJsxRuntime_production_min.Fragment = 60107;
if (typeof Symbol === "function" && Symbol.for) {
  var h = Symbol.for;
  g = h("react.element");
  reactJsxRuntime_production_min.Fragment = h("react.fragment");
}
var m = f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, n = Object.prototype.hasOwnProperty, p = { key: true, ref: true, __self: true, __source: true };
function q(c, a, k) {
  var b, d = {}, e = null, l = null;
  k !== void 0 && (e = "" + k);
  a.key !== void 0 && (e = "" + a.key);
  a.ref !== void 0 && (l = a.ref);
  for (b in a)
    n.call(a, b) && !p.hasOwnProperty(b) && (d[b] = a[b]);
  if (c && c.defaultProps)
    for (b in a = c.defaultProps, a)
      d[b] === void 0 && (d[b] = a[b]);
  return { $$typeof: g, type: c, key: e, ref: l, props: d, _owner: m.current };
}
reactJsxRuntime_production_min.jsx = q;
reactJsxRuntime_production_min.jsxs = q;
{
  jsxRuntime.exports = reactJsxRuntime_production_min;
}
const jsx = jsxRuntime.exports.jsx;
const Canvas = forwardRef((props, ref) => {
  const canvasRef = useRef(null);
  const isPainting = useRef(false);
  let steps = [];
  const defaultLineStyle = {
    strokeStyle: "black",
    lineWidth: 2,
    shadowBlur: "1",
    lineCap: "round",
    shadowColor: "black",
    lineJoin: "round"
  };
  useImperativeHandle(ref, () => ({
    canvasRef,
    undo: handleUnDo,
    clear: handleClear,
    save: handleSave
  }));
  const getContextByRef = () => {
    const canvasElement = getCanvasByRef();
    if (!canvasElement) {
      throw Error();
    }
    const context = canvasElement.getContext("2d");
    if (!context) {
      throw Error();
    }
    return context;
  };
  const getCanvasByRef = () => {
    const canvasElement = canvasRef.current;
    if (!canvasElement) {
      throw Error();
    }
    return canvasElement;
  };
  const handleMouseMove = (e) => {
    const canvasElement = getCanvasByRef();
    draw(e.pageX - canvasElement.offsetLeft, e.pageY - canvasElement.offsetTop);
  };
  const handleMouseUp = (e) => {
    endDraw();
  };
  const handleMouseDown = (e) => {
    const canvasElement = getCanvasByRef();
    const context = getContextByRef();
    isPainting.current = true;
    handleStyleInit();
    context.beginPath();
    context.moveTo(e.pageX - canvasElement.offsetLeft, e.pageY - canvasElement.offsetTop);
  };
  const handleMouseLeave = (e) => {
    isPainting.current = false;
  };
  const handleTouchStart = (e) => {
    e.preventDefault();
    const canvasElement = getCanvasByRef();
    beforeDraw(e.changedTouches[0].pageX - canvasElement.offsetLeft, e.changedTouches[0].pageY - canvasElement.offsetTop);
  };
  const handleTouchMove = (e) => {
    e.preventDefault();
    const canvasElement = getCanvasByRef();
    draw(e.changedTouches[0].pageX - canvasElement.offsetLeft, e.changedTouches[0].pageY - canvasElement.offsetTop);
  };
  const handleTouchEnd = (e) => {
    e.preventDefault();
    endDraw();
  };
  const beforeDraw = (x, y) => {
    const context = getContextByRef();
    isPainting.current = true;
    handleStyleInit();
    context.beginPath();
    context.moveTo(x, y);
  };
  const draw = (x, y) => {
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
    steps.push(context.getImageData(0, 0, canvasElement.offsetWidth, canvasElement.offsetHeight));
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
    context.clearRect(0, 0, canvasElement.offsetWidth, canvasElement.offsetHeight);
    steps = [];
  };
  const handleStyleInit = () => {
    const context = getContextByRef();
    const contextProps = __spreadValues(__spreadValues({}, defaultLineStyle), props.contextProps);
    for (let key in contextProps) {
      context[key] = contextProps[key];
    }
  };
  const handleSave = () => {
    const canvasElement = getCanvasByRef();
    const a = document.createElement("a");
    a.download = "canvas.png";
    a.href = canvasElement.toDataURL("image/png");
    a.dispatchEvent(new MouseEvent("click"));
  };
  useEvent(canvasRef, {
    mousemove: handleMouseMove,
    mousedown: handleMouseDown,
    mouseup: handleMouseUp,
    mouseleave: handleMouseLeave,
    touchstart: handleTouchStart,
    touchmove: handleTouchMove,
    touchend: handleTouchEnd
  });
  return /* @__PURE__ */ jsx("div", {
    className: "App",
    children: /* @__PURE__ */ jsx("canvas", {
      className: props.className,
      ref: canvasRef,
      width: props.width,
      height: props.height
    })
  });
});
export { Canvas as default };
