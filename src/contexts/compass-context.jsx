// contexts/compass-context.js
import { createContext, useContext, useRef } from "react";

const CompassContext = createContext(null);

export function CompassProvider({ children }) {
  const rotationRef = useRef(0); // Khởi tạo giá trị ban đầu là 0
  
  return (
    <CompassContext.Provider value={rotationRef}>
      {children}
    </CompassContext.Provider>
  );
}

export const useCompass = () => {
  const context = useContext(CompassContext);
  if (!context) {
    console.error("useCompass must be used within a CompassProvider");
  }
  return context;
};
