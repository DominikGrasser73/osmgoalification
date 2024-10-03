import { createContext, useContext } from "react";

export type MapContextType = {
  lineID: number;
  setLineID: (_value: number) => void;
  lineName: string;
  setLineName: (_value: string) => void;
  distance: number;
  setDistance: (_value: number) => void;
  currentDistance: number;
  setCurrentDistance: (_value: number) => void;
  statesVisited: Map<string, number>;
  setStatesVisited: (_value: Map<string, number>) => void;
  districtsVisited: Map<string, number>;
  setDistrictsVisited: (_value: Map<string, number>) => void;
  countiesVisited: Map<string, number>;
  setCountiesVisited: (_value: Map<string, number>) => void;
  cityDistrictsVisited: Map<string, number>;
  setCityDistrictsVisited: (_value: Map<string, number>) => void;
  transportMode: string;
  setTransportMode: (_value: string) => void;
  saveData: boolean;
  setSaveData: (_value: boolean) => void;
  linesTravelled: Map<string, number>;
  setLinesTravelled: (_value: Map<string, number>) => void;
  currentLines: Map<string, number>;
  setCurrentLines: (_value: Map<string, number>) => void;
  currentStates: Map<string, number>;
  setCurrentStates: (_value: Map<string, number>) => void;
  currentDistricts: Map<string, number>;
  setCurrentDistricts: (_value: Map<string, number>) => void;
  currentCounties: Map<string, number>;
  setCurrentCounties: (_value: Map<string, number>) => void;
  currentCityDistricts: Map<string, number>;
  setCurrentCityDistricts: (_value: Map<string, number>) => void;
  currentXP: number;
  setCurrentXP: (_value: number) => void;
  currentLevel: number;
  setCurrentLevel: (_value: number) => void;
  xPToNextLevel: number;
  setXPToNextLevel: (_value: number) => void;
};

export const MapContext = createContext<MapContextType>({
  lineID: 32252,
  setLineID: (_value: number) => {},
  lineName: "test",
  setLineName: (_value: string) => {},
  distance: 0,
  setDistance: (_value: number) => {},
  currentDistance: 0,
  setCurrentDistance: (_value: number) => {},
  statesVisited: new Map<string, number>(),
  setStatesVisited: (_value: Map<string, number>) => {},
  districtsVisited: new Map<string, number>(),
  setDistrictsVisited: (_value: Map<string, number>) => {},
  countiesVisited: new Map<string, number>(),
  setCountiesVisited: (_value: Map<string, number>) => {},
  cityDistrictsVisited: new Map<string, number>(),
  setCityDistrictsVisited: (_value: Map<string, number>) => {},
  transportMode: "tram",
  setTransportMode: (_value: string) => {},
  saveData: false,
  setSaveData: (_value: boolean) => {},
  linesTravelled: new Map<string, number>(),
  setLinesTravelled: (_value: Map<string, number>) => {},
  currentLines: new Map<string, number>(),
  setCurrentLines: (_value: Map<string, number>) => {},
  currentStates: new Map<string, number>(),
  setCurrentStates: (_value: Map<string, number>) => {},
  currentDistricts: new Map<string, number>(),
  setCurrentDistricts: (_value: Map<string, number>) => {},
  currentCounties: new Map<string, number>(),
  setCurrentCounties: (_value: Map<string, number>) => {},
  currentCityDistricts: new Map<string, number>(),
  setCurrentCityDistricts: (_value: Map<string, number>) => {},
  currentXP: 0,
  setCurrentXP: (_value: number) => {},
  currentLevel: 1,
  setCurrentLevel: (_value: number) => {},
  xPToNextLevel: 100,
  setXPToNextLevel: (_value: number) => {},
});
export const useMapContext = () => useContext(MapContext);
