import React, { createContext, useContext, useState } from "react";

const ModificationContext = createContext();

export const ModificationProvider = ({ children }) => {
  const [isModified, setIsModified] = useState(false);

  return (
    <ModificationContext.Provider value={{ isModified, setIsModified }}>
      {children}
    </ModificationContext.Provider>
  );
};

export const useModification = () => useContext(ModificationContext);
