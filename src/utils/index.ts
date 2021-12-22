import { RefObject, useEffect, useRef } from "react";

export const useEvent = <K extends HTMLElement>(
  elementRef: RefObject<K>,
  eventMap: Record<string, any>
) => {
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
