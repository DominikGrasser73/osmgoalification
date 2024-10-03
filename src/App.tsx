import { MapWrapper } from "./components/Map";
import "./App.css";
import { useState } from "react";
import TransportModeButton from "./components/TransportModeButton";
import { GeoJsonObject } from "geojson";
import SearchBar from "./components/SearchBar";
import {
  MapContext,
  MapContextType,
  useMapContext,
} from "./components/MapContext";
import { ProgressBarComponent } from "./components/ProgressBar";
import { DataStorage } from "./util/dataStorage";
import { Tabs } from "react-bootstrap";
import { Tab } from "react-bootstrap";
import StatisticsTab from "./components/StatisticsTab";
import { BadgeComponent } from "./components/BadgeComponent";

function App() {
  //localStorage.clear();
  const [lineID, setLineID] = useState(32252);
  const [lineName, setLineName] = useState("1: Universität - Auwiesen");
  const [distance, setDistance] = useState(
    parseInt(localStorage.getItem("distance") ?? "0")
  );

  const [saveData, setSaveData] = useState(false);
  const [currentDistance, setCurrentDistance] = useState(
    parseInt(localStorage.getItem("currentDistance") ?? "0")
  );
  const [statesVisited, setStatesVisited] = useState<Map<string, number>>(
    () => {
      const map = localStorage.getItem("statesVisited");
      console.log("StatesVisitedOnLoad", map);
      if (map) {
        return new Map(JSON.parse(map));
      } else {
        return new Map<string, number>();
      }
    }
  );

  const [districtsVisited, setDistrictsVisited] = useState<Map<string, number>>(
    () => {
      const map = localStorage.getItem("districtsVisited");
      if (map) {
        return new Map(JSON.parse(map));
      } else {
        return new Map<string, number>();
      }
    }
  );
  const [countiesVisited, setCountiesVisited] = useState<Map<string, number>>(
    () => {
      const map = localStorage.getItem("countiesVisited");
      if (map) {
        return new Map(JSON.parse(map));
      } else {
        return new Map<string, number>();
      }
    }
  );
  const [cityDistrictsVisited, setCityDistrictsVisited] = useState<
    Map<string, number>
  >(() => {
    const map = localStorage.getItem("cityDistrictsVisited");
    if (map) {
      return new Map(JSON.parse(map));
    } else {
      return new Map<string, number>();
    }
  });
  const [transportMode, setTransportMode] = useState("tram");
  const [linesTravelled, setLinesTravelled] = useState<Map<string, number>>(
    () => {
      const map = localStorage.getItem("linesTravelled");
      if (map) {
        return new Map(JSON.parse(map));
      } else {
        return new Map<string, number>();
      }
    }
  );
  const [currentLines, setCurrentLines] = useState<Map<string, number>>(() => {
    const map = localStorage.getItem("currentLines");
    if (map) {
      return new Map(JSON.parse(map));
    } else {
      return new Map<string, number>();
    }
  });
  const [currentStates, setCurrentStates] = useState<Map<string, number>>(
    () => {
      const map = localStorage.getItem("currentStates");
      if (map) {
        return new Map(JSON.parse(map));
      } else {
        return new Map<string, number>();
      }
    }
  );
  const [currentDistricts, setCurrentDistricts] = useState<Map<string, number>>(
    () => {
      const map = localStorage.getItem("currentDistricts");
      if (map) {
        return new Map(JSON.parse(map));
      } else {
        return new Map<string, number>();
      }
    }
  );
  const [currentCounties, setCurrentCounties] = useState<Map<string, number>>(
    () => {
      const map = localStorage.getItem("currentCounties");
      if (map) {
        return new Map(JSON.parse(map));
      } else {
        return new Map<string, number>();
      }
    }
  );
  const [currentCityDistricts, setCurrentCityDistricts] = useState<
    Map<string, number>
  >(() => {
    const map = localStorage.getItem("currentCityDistricts");
    if (map) {
      return new Map(JSON.parse(map));
    } else {
      return new Map<string, number>();
    }
  });
  const [currentXP, setCurrentXP] = useState(
    parseInt(localStorage.getItem("currentXP") ?? "0")
  );
  const [currentLevel, setCurrentLevel] = useState(
    parseInt(localStorage.getItem("currentLevel") ?? "1")
  );
  const [xPToNextLevel, setXPToNextLevel] = useState(
    parseInt(localStorage.getItem("xPToNextLevel") ?? "100")
  );

  return (
    <div>
      <MapContext.Provider
        value={{
          lineID,
          setLineID,
          lineName,
          setLineName,
          distance,
          setDistance,
          currentDistance,
          setCurrentDistance,
          statesVisited,
          setStatesVisited,
          districtsVisited,
          setDistrictsVisited,
          countiesVisited,
          setCountiesVisited,
          cityDistrictsVisited,
          setCityDistrictsVisited,
          transportMode,
          setTransportMode,
          saveData,
          setSaveData,
          linesTravelled,
          setLinesTravelled,
          currentLines,
          setCurrentLines,
          currentStates,
          setCurrentStates,
          currentDistricts,
          setCurrentDistricts,
          currentCounties,
          setCurrentCounties,
          currentCityDistricts,
          setCurrentCityDistricts,
          currentXP,
          setCurrentXP,
          currentLevel,
          setCurrentLevel,
          xPToNextLevel,
          setXPToNextLevel,
        }}
      >
        <TransportModeButton />
        <SearchBar />
        <MapWrapper /> {/* Render the MapWrapper component */}
        <DataStorage />
        <Tabs defaultActiveKey="goals" id="tabid" className="mb-3">
          <Tab eventKey="goals" title="Goals">
            <ProgressBarComponent />
          </Tab>

          <Tab eventKey="states" title="States">
            {StatisticsTab(statesVisited)}
          </Tab>
          <Tab eventKey="districts" title="Districts">
            {StatisticsTab(districtsVisited)}
          </Tab>
          <Tab eventKey="counties" title="Counties">
            {StatisticsTab(countiesVisited)}
          </Tab>
          <Tab eventKey="cityDistricts" title="CityDistricts">
            {StatisticsTab(cityDistrictsVisited)}
          </Tab>
          <Tab eventKey="Lines Used" title="Lines">
            {StatisticsTab(linesTravelled)}
          </Tab>
          <Tab eventKey="xp" title="Experience and Levels">
            <h1>Experience: {currentXP}</h1>
            <h1>Level: {currentLevel}</h1>
            <h1>XP to next level: {xPToNextLevel}</h1>
          </Tab>
          <Tab eventKey="badges" title="Badges">
            <BadgeComponent />
          </Tab>
        </Tabs>
      </MapContext.Provider>
    </div>
  );
}

export default App;
