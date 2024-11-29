import { useEffect, useRef, useState } from "react";

export const useContainerSize = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });  

  function updateContainerSize() {
    if (containerRef.current === null) return;

    const newWidth = containerRef.current.clientWidth;
    const newHeight = containerRef.current.clientHeight;

    // Only update state if the size actually changes
    if (newWidth !== containerSize.width || newHeight !== containerSize.height) {
      setContainerSize({ width: newWidth, height: newHeight });
    }
  };

  // resize observer
  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => updateContainerSize());

    if (containerRef.current) resizeObserver.observe(containerRef.current);
    return () => {
      if (containerRef.current) resizeObserver.unobserve(containerRef.current);
    }
  }, []);

  return {
    containerRef,
    containerSize,
  };
};