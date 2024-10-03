import { useEffect } from "react";
import { useMapContext } from "../components/MapContext";

export const DataStorage = () => {
  const {
    statesVisited,
    distance,
    currentDistance,
    saveData,
    setSaveData,
    districtsVisited,
    countiesVisited,
    cityDistrictsVisited,
    linesTravelled,
    currentLines,
    currentStates,
    currentDistricts,
    currentCounties,
    currentCityDistricts,
    currentXP,
    currentLevel,
    xPToNextLevel,
  } = useMapContext();

  useEffect(() => {
    if (saveData) {
      localStorage.setItem("statesVisited", JSON.stringify([...statesVisited]));
      localStorage.setItem(
        "districtsVisited",
        JSON.stringify([...districtsVisited])
      );
      localStorage.setItem(
        "countiesVisited",
        JSON.stringify([...countiesVisited])
      );
      localStorage.setItem(
        "cityDistrictsVisited",
        JSON.stringify([...cityDistrictsVisited])
      );
      localStorage.setItem(
        "linesTravelled",
        JSON.stringify([...linesTravelled])
      );
      localStorage.setItem("distance", JSON.stringify(distance));
      localStorage.setItem("currentDistance", JSON.stringify(currentDistance));
      localStorage.setItem("currentLines", JSON.stringify([...currentLines]));
      localStorage.setItem("currentStates", JSON.stringify([...currentStates]));
      localStorage.setItem(
        "currentDistricts",
        JSON.stringify([...currentDistricts])
      );

      localStorage.setItem(
        "currentCounties",
        JSON.stringify([...currentCounties])
      );
      localStorage.setItem(
        "currentCityDistricts",
        JSON.stringify([...currentCityDistricts])
      );
      localStorage.setItem("currentXP", JSON.stringify(currentXP));
      localStorage.setItem("currentLevel", JSON.stringify(currentLevel));
      localStorage.setItem("xPToNextLevel", JSON.stringify(xPToNextLevel));

      console.log("statesVisited", statesVisited);
    }
    setSaveData(false);
  }, [saveData]);

  return <></>;
};
