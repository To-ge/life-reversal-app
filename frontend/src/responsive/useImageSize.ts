import { useState, useEffect } from "react";

const useImageSize = (width: number, height: number) => {
  const [imageSize, setImageSize] = useState({
    width,
    height,
  });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) {
        setImageSize({ width, height });
      } else if (window.innerWidth >= 1024) {
        setImageSize({
          width: Math.floor((width * 5) / 6),
          height: Math.floor((height * 5) / 6),
        });
      } else if (window.innerWidth >= 768) {
        setImageSize({
          width: Math.floor(width / 2),
          height: Math.floor(height / 2),
        });
      } else if (window.innerWidth >= 640) {
        setImageSize({
          width: Math.floor(width / 3),
          height: Math.floor(height / 3),
        });
      } else {
        setImageSize({
          width: Math.floor(width / 4),
          height: Math.floor(height / 4),
        });
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return imageSize;
};

export default useImageSize;
