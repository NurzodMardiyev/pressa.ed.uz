import React, { createContext, useState } from "react";

export const contextOAIV = createContext();

export default function ContextApiProvider({ children }) {
  const [universByRegion, setUniversByRegion] = useState();
  const [backToUniver, setBackToUniver] = useState(true);
  const [oavPostAll, setOavPostAll] = useState([]);
  const [mediaEventAll, setMediaEventAll] = useState([]);
  const [foreignAll, setForeignAll] = useState(0);
  const [materialAll, setMaterialAll] = useState([]);
  const [onlineBroadcast, setOnlineBroadcast] = useState(0);

  return (
    <contextOAIV.Provider
      value={{
        universByRegion,
        setUniversByRegion,
        backToUniver,
        setBackToUniver,
        oavPostAll,
        setOavPostAll,
        mediaEventAll,
        setMediaEventAll,
        foreignAll,
        setForeignAll,
        materialAll,
        setMaterialAll,
        onlineBroadcast,
        setOnlineBroadcast,
      }}
    >
      {children}
    </contextOAIV.Provider>
  );
}
