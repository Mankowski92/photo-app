import { useEffect, useState } from "react";

interface Size {
  width: number;
  height: number;
}

const useWindowSize = (): Size => {
  const [sizes, setSizes] = useState<Size>({ width: 0, height: 0 });

  useEffect(() => {
    const handleResize = () => {
      setSizes({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [setSizes]);

  return sizes;
};

export default useWindowSize;
