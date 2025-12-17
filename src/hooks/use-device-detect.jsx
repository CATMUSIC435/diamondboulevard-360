"use client";

import { useState, useEffect } from "react";

export function useDeviceDetect() {
  const [deviceInfo, setDeviceInfo] = useState({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    hasTouch: false,
  });

  useEffect(() => {
    const handleResize = () => {
      const ua = navigator.userAgent;
      const isMobile = /iPhone|Android|IEMobile|BlackBerry|Opera Mini/i.test(ua);
      const isTablet = /iPad|tablet/i.test(ua);
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      
      // Kiểm tra dựa trên độ phân giải màn hình
      const width = window.innerWidth;

      setDeviceInfo({
        isMobile: isMobile || width < 768,
        isTablet: isTablet || (width >= 768 && width < 1024),
        isDesktop: !isMobile && !isTablet && width >= 1024,
        hasTouch,
      });
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return deviceInfo;
}