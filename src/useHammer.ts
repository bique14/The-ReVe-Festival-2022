import Hammer from "hammerjs";
import { useEffect, useRef, useState } from "react";

interface IHammer {
  mc: HammerManager;
  pan: PanRecognizer;
  rotate: RotateRecognizer;
  pinch: PinchRecognizer;
}

const useHammer = () => {
  let adjustDeltaX: number = 0;
  let adjustDeltaY: number = 0;
  let adjustScale: number = 1;
  let adjustRotation: number = 0;

  let currentDeltaX: any = 0;
  let currentDeltaY: any = 0;
  let currentScale: any = 0;
  let currentRotation: any = 0;

  const [hammer, setHammer] = useState<IHammer>();
  const stageRef = useRef<any>(null);
  const [isStageReady, setIsStageReady] = useState<boolean>(false);

  useEffect(() => {
    console.log(stageRef);
    if (isStageReady)
      setHammer({
        mc: new Hammer.Manager(stageRef.current!),
        pan: new Hammer.Pan(),
        rotate: new Hammer.Rotate(),
        pinch: new Hammer.Pinch(),
      });
  }, [stageRef, isStageReady]);

  useEffect(() => {
    if (hammer) {
      const x = document.getElementById("x")!;
      const { mc, pan, rotate, pinch } = hammer;
      mc.add([pan, pinch, rotate]);
      mc.get("pinch").set({ enable: true });
      mc.get("rotate").set({ enable: true });

      mc.on("panstart pinchstart rotatestart", function (e) {
        adjustRotation -= e.rotation;
      });

      mc.on("panmove pinchmove rotatemove", function (e) {
        currentRotation = adjustRotation + e.rotation;
        currentScale = adjustScale * e.scale;
        currentDeltaX = adjustDeltaX + e.deltaX / currentScale;
        currentDeltaY = adjustDeltaY + e.deltaY / currentScale;

        let transforms = ["scale(" + currentScale + ")"];
        // transforms.push(
        //   "translate(" + currentDeltaX + "px," + currentDeltaY + "px)"
        // );
        transforms.push("rotate(" + Math.round(currentRotation) + "deg)");
        stageRef.current!.style.transform = transforms.join(" ");
      });

      mc.on("panend pinchend rotateend", function (e) {
        adjustScale = currentScale;
        adjustRotation = currentRotation;
        adjustDeltaX = currentDeltaX;
        adjustDeltaY = currentDeltaY;
      });
    }
  }, [hammer]);

  return { stageRef, setIsStageReady };
};

export default useHammer;
