import { useState, useEffect } from "react";

const useBreakpoint = () => {
  const [breakpoint, setBreakpoint] = useState<string>("sm");

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;

      if (screenWidth >= 1280) {
        setBreakpoint("xl");
      } else if (screenWidth >= 1024) {
        setBreakpoint("lg");
      } else if (screenWidth >= 768) {
        setBreakpoint("md");
      } else {
        setBreakpoint("sm");
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return breakpoint;
};

export default useBreakpoint;
