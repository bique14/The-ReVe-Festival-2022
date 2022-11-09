import { useEffect, useState } from "react";
import { Rnd } from "react-rnd";
import Div100vh from "react-div-100vh";
import html2canvas from "html2canvas";

import { drawImageScaled } from "./utils/canvas.helper";
import Header from "./components/Header";

import HeadPhoneSrc from "./assets/headphone.png";
import useHammer from "./useHammer";
import useCountdown from "./useCountdown";
import Countdown from "./components/Countdown";

interface IHeadphoneAttributes {
  width: number | string;
  height: number | string;
  x: number;
  y: number;
}

const HeadphoneAttributes: IHeadphoneAttributes = {
  width: 96,
  height: 96,
  x: 50,
  y: 50,
};

function App() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const { stageRef, setIsStageReady } = useHammer();
  const { dateFormat, setIsShowCountdown } = useCountdown();

  useEffect(() => {
    const canvas = document.getElementById("canvas")! as HTMLCanvasElement;
    if (imageSrc) {
      const ctx = canvas.getContext("2d")!;
      const img: HTMLImageElement = new Image();
      img.onload = function () {
        const width = (this as any).width;
        const height = (this as any).height;
        canvas.width = width;
        canvas.height = height;

        drawImageScaled(img, ctx);
      };
      img.src = imageSrc;
    }
  }, [imageSrc]);

  const onFileSelect = (event: any) => {
    const selected: File = event.target.files[0];
    const url: string = URL.createObjectURL(selected);

    setImageSrc(url);
    setIsStageReady(true);
    setIsShowCountdown(false);
  };

  const onCapture = () => {
    const preview = document.getElementById("preview-container")!;
    const x = document.getElementById("x")!;

    x.style.border = "none";
    html2canvas(preview).then(function (canvas) {
      canvas.toBlob((blob: any) => {
        const url: string = URL.createObjectURL(blob);
        downloadImage(url);
        x.style.border = "2px dotted white";
      });
    });
  };

  const downloadImage = (downloadUrl: string) => {
    const a = document.createElement("a");
    a.href = downloadUrl;
    a.download = "reveluv.png";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <Div100vh>
      <Header />

      <div className="m-5">
        {imageSrc && (
          <div className="fixed z-10 bottom-0 left-0 w-full px-4 py-5 bg-[rgb(241,63,171)]">
            <button
              className="bg-[#b2fa00] text-black font-bold w-full p-2 rounded"
              onClick={onCapture}
            >
              OK! Snap it!
            </button>
          </div>
        )}

        <span className="block text-sm mb-4 text-[rgb(241,63,171)] text-center">
          Choose your picture to wear ReVeluv headphones!
        </span>
        <input
          type="file"
          accept="image/png, image/jpeg"
          onChange={onFileSelect}
        />

        {!imageSrc && <Countdown {...dateFormat!} />}

        {imageSrc && (
          <>
            <div className="flex flex-col text-center text-[10px] italic text-gray-500 my-4">
              <span>
                ⭐️ <b>Pinch</b> to rotate, and move the headphone ⭐️
                <br />
                ⭐️ <b>Drag</b> the corner to resize headphone ⭐️
                <br />
                🤡{" "}
                <b>
                  <u>Do not</u>
                </b>{" "}
                worry about dotted border its will disappear when snap 🤡
              </span>
            </div>

            <div id="preview-container" className="relative overflow-hidden">
              <canvas id="canvas" className="w-full h-full" />
              <Rnd
                id="x"
                className="border-2 border-dotted border-white sm:hover:border-2 border-dashed border-white"
                default={HeadphoneAttributes}
              >
                <img
                  id="stage"
                  ref={stageRef}
                  className="w-full h-full"
                  src={HeadPhoneSrc}
                  draggable={false}
                />
              </Rnd>
            </div>
          </>
        )}
      </div>
    </Div100vh>
  );
}

export default App;
