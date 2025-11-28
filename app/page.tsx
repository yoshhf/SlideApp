"use client";

export const dynamic = "force-dynamic";
import { useEffect, useState } from "react";
import { useControls } from "@/components/ControlsShell";


export default function HomePage() {
  const images = [
    "/gallery/img1.jpeg",
    "/gallery/img2.jpeg",
    "/gallery/img3.jpeg",
    "/gallery/img4.jpeg",
    "/gallery/img5.jpeg",
    "/gallery/img6.jpeg",
  ];
  const [index, setIndex] = useState(0);
  const controls = useControls();

  useEffect(() => {
    // register index/total to controls every time they change
    controls.setIndexAndTotal(index, images.length);

    // register handlers
    controls.setHandlers({
      onPrev: () => {
        if (index > 0) setIndex((i) => i - 1);
      },
      onNext: () => {
        if (index < images.length - 1) setIndex((i) => i + 1);
      },
    });
  }, [index, images.length]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="w-full h-full flex items-center justify-center">
        <img
          src={images[index]}
          alt="slide"
          className="max-w-full max-h-[90vh] object-contain"
        />
      </div>
    </div>
  );
}
