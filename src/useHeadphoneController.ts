import { useState, useEffect, useRef } from "react";
import resizer from "move-rotate-resizer";

const options = {
  minWidth: 30, // minimum width in px
  minHeight: 30, // minimum height in px
  aspectRatio: true, // if true width height ratio will maintain
  resizeFromCenter: false, // if true then resize both side from center
  onDragStart: null, // call-back function that called when dragging start
  onDragging: null, // call-back function that called every mouse movement till mousedown
  onDragEnd: null, // call-back function that called when mouse button is released after move
  onResizeStart: null, // call-back function that called when any resize handler is start dragging
  onResizing: null, // call-back function that called every mouse movement till musedown
  onResizeEnd: null, // call-back function that called when release resize handler
  onRotateStart: null, // call-back function that called when rotate handler is started dragging
  onRotating: null, // call-back function that called every movement of rotate handler
  onRotateEnd: null, // call-back function that called when release rotate handler
  onResizerShown: null, // call-back function that called when resizer is first time shown on target
  onResizerHide: null, // call-back function that called when resizer is hide on target
  isHideOnResize: true, // if true then resizer will not visible at the time of dragging so that target visible clearly
  isHoverLine: true, // if true then target element on mouse hover hoverLine visible for highlight target element
  resizers: {
    n: true, // top middle resize handler            true:visible|false:hidden
    s: true, // bottom middle resize handler
    e: true, // right middle resize handler
    w: true, // left middle resize handler
    ne: true, // top-right resize handler
    nw: true, // top-left resize handler
    se: true, // bottom-right resize handler
    sw: true, // bottom-left resize handler
    r: true, // rotate handler
  },
};

const useHeadphoneController = () => {
  const stageRef = useRef<any>(null);
  const [isStageReady, setIsStageReady] = useState<boolean>(false);

  useEffect(() => {
    if (stageRef) {
      resizer.add(stageRef.current, options);

      document.addEventListener("click", (e) => {
        resizer.hide();
      });
    }
  }, [stageRef, isStageReady]);

  return { stageRef, setIsStageReady };
};

export default useHeadphoneController;
