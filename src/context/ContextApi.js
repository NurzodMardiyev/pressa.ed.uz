import React, { createContext, useState } from "react";

export const contextOAIV = createContext();

export default function ContextApiProvider({ children }) {
  const [oavTV, setOavTV] = useState();

  return (
    <contextOAIV.Provider value={(oavTV, setOavTV)}>
      {children}
    </contextOAIV.Provider>
  );
}
