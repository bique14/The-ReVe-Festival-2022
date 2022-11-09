import { useEffect, useState } from "react";
import { gtag, install } from "ga-gtag";
import Div100vh from "react-div-100vh";
import html2canvas from "html2canvas";

import { drawImageScaled } from "./utils/canvas.helper";
import Header from "./components/Header";

import HeadPhoneSrc from "./assets/headphone.png";
import Countdown from "./components/Countdown";
import useCountdown from "./useCountdown";
import useHeadphoneController from "./useHeadphoneController";

function App() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const { stageRef, setIsStageReady } = useHeadphoneController();
  const { dateFormat, setIsShowCountdown } = useCountdown();

  useEffect(() => {
    install("G-5NJD1QCCJC");
  }, []);

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

    // document.documentElement.requestFullscreen();

    setImageSrc(url);
    setIsStageReady(true);
    setIsShowCountdown(false);
  };

  const onCapture = () => {
    const preview = document.getElementById("preview-container")!;

    html2canvas(preview).then(function (canvas) {
      canvas.toBlob((blob: any) => {
        const url: string = URL.createObjectURL(blob);
        console.log(url);
        downloadImage(url);
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

        <span className="block text-sm -mt-4 text-[rgb(241,63,171)] text-center">
          Choose your picture to wear ReVeluv headphones!
        </span>
        <input
          type="file"
          accept="image/png, image/jpeg"
          onChange={onFileSelect}
          className="my-4"
        />

        {!imageSrc && <Countdown {...dateFormat!} />}

        {imageSrc && (
          <div id="preview-container" className="relative overflow-hidden">
            <canvas id="canvas" className="w-full h-full" />
            <img
              id="stage"
              ref={stageRef}
              className="absolute top-0 w-40 h-40"
              src={HeadPhoneSrc}
              draggable={false}
            />
          </div>
        )}
      </div>
    </Div100vh>
  );
}

export default App;
