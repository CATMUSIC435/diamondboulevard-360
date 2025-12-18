"use client";

import { createContext, useContext, useState } from "react";

const SidebarContext = createContext(undefined);

export function SidebarProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState(null);

  const openSidebar = (newData) => {
    setData(newData);
    setIsOpen(true);
  };

  const closeSidebar = () => setIsOpen(false);

  return (
    <SidebarContext.Provider value={{ isOpen, data, openSidebar, closeSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
}

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) throw new Error("useSidebar must be used within SidebarProvider");
  return context;
};