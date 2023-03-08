import React, { useEffect, useState } from "react";
import Image from "next/image";

interface ResponsiveImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  bigVariant?: boolean;
}

const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  src,
  alt,
  width,
  height,
  bigVariant = false,
}) => {
  const [imageWidth, setImageWidth] = useState<number>(width);
  const [imageHeight, setImageHeight] = useState<number>(height);

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      const imageAspectRatio = width / height;
      const newWidth = bigVariant ? windowWidth * 0.3 : windowWidth * 0.2;
      const newHeight = newWidth / imageAspectRatio;
      setImageWidth(newWidth);
      setImageHeight(newHeight);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [width, height]);

  return <Image src={src} alt={alt} width={imageWidth} height={imageHeight} />;
};

export default ResponsiveImage;
