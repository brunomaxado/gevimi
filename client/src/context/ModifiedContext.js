import React, { createContext, useState, useContext } from "react";

// Criação do contexto
const ModifiedContext = createContext();

// Provider do contexto
export const ModifiedProvider = ({ children }) => {
  const [isModified, setIsModified] = useState(false);

  return (
    <ModifiedContext.Provider value={{ isModified, setIsModified }}>
      {children}
    </ModifiedContext.Provider>
  );
};

// Hook para acessar o contexto de forma simplificada
export const useModified = () => {
  return useContext(ModifiedContext);
};
