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
  const [loaded, setLoaded] = useState(false);
  const controls = useControls();

  useEffect(() => {
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.decoding = "async";
    });
  }, []);

  useEffect(() => {
    controls.setIndexAndTotal(index, images.length);

    controls.setHandlers({
      onPrev: () => {
        if (index > 0) changeImage(index - 1);
      },
      onNext: () => {
        if (index < images.length - 1) changeImage(index + 1);
      },
    });
  }, [index]);

  const changeImage = (i: number) => {
    setLoaded(false); 
    setIndex(i);

    const img = new Image();
    img.src = images[i];
    img.onload = () => setLoaded(true);
  };

  useEffect(() => {
    const img = new Image();
    img.src = images[index];
    img.onload = () => setLoaded(true);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black relative">
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center text-white text-xl animate-pulse">
          Loading...
        </div>
      )}

      <img
        src={images[index]}
        alt="slide"
        loading="lazy"
        decoding="async"
        className={`max-w-full max-h-[90vh] object-contain transition-opacity duration-300 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}
