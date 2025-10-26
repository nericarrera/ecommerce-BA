import { createContext, useContext } from "react";

export const AppContext = createContext();

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext debe usarse dentro de AppProvider");
  }
  return context;
}


