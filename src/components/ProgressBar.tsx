import { useEffect, useState } from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import ProgressBar from "react-bootstrap/ProgressBar";
import { useMapContext } from "./MapContext";

export const ProgressBarComponent = () => {
  const {
    currentDistance,
    setCurrentDistance,
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
    currentLevel,
    setCurrentLevel,
    currentXP,
    setCurrentXP,
    xPToNextLevel,
    setXPToNextLevel,
  } = useMapContext();
  const [distanceGoal, setDistanceGoal] = useState(10);
  const [stateGoal, setStateGoal] = useState(2);
  const [districtGoal, setDistrictGoal] = useState(3);
  const [countyGoal, setCountyGoal] = useState(5);
  const [cityDistrictGoal, setCityDistrictGoal] = useState(5);
  const [lineGoal, setLineGoal] = useState(5);

  if (currentDistance >= distanceGoal) {
    setCurrentDistance(0);
    alert("Congratulations! You have reached your goal!");
    gainXp(distanceGoal, 1);
  }
  if (currentStates.size >= stateGoal) {
    setCurrentStates(new Map() as Map<string, number>);
    alert("Congratulations! You have reached your goal!");
    gainXp(stateGoal, 100);
  }
  if (currentDistricts.size >= districtGoal) {
    setCurrentDistricts(new Map() as Map<string, number>);
    alert("Congratulations! You have reached your goal!");
    gainXp(districtGoal, 50);
  }
  if (currentCounties.size >= countyGoal) {
    setCurrentCounties(new Map() as Map<string, number>);
    alert("Congratulations! You have reached your goal!");
    gainXp(countyGoal, 40);
  }
  if (currentCityDistricts.size >= cityDistrictGoal) {
    setCurrentCityDistricts(new Map() as Map<string, number>);
    alert("Congratulations! You have reached your goal!");
    gainXp(cityDistrictGoal, 30);
  }
  if (currentLines.size >= lineGoal) {
    setCurrentLines(new Map() as Map<string, number>);
    alert("Congratulations! You have reached your goal!");
    gainXp(lineGoal, 20);
  }
  function gainXp(xp: number, multiplier: number) {
    setCurrentXP(currentXP + xp * multiplier);
    if (currentXP >= xPToNextLevel) {
      setCurrentXP(currentXP - xPToNextLevel);

      setCurrentLevel(currentLevel + 1);
      alert("Congratulations! You have reached level " + currentLevel + "!");
      setXPToNextLevel(xPToNextLevel * 1.2);
    }
  }

  useEffect(() => {
    if (currentXP >= xPToNextLevel) {
      setCurrentXP(currentXP - xPToNextLevel);

      setCurrentLevel(currentLevel + 1);
      var lvl = currentLevel + 1;
      alert("Congratulations! You have reached level " + lvl + "!");
      setXPToNextLevel(Math.round(xPToNextLevel * 1.2));
    }
  }, [currentXP, xPToNextLevel]);

  return (
    <div>
      {"Kilometres Travelled"}
      <ProgressBar
        id="distance"
        min={0}
        max={distanceGoal}
        now={currentDistance}
        label={`${currentDistance}/${distanceGoal}` + "KM travelled"}
        variant="success"
      ></ProgressBar>
      <ButtonGroup>
        <Button
          onClick={() => {
            setDistanceGoal(distanceGoal + 10);
          }}
        >
          Increase Goal
        </Button>
        <Button
          onClick={() => {
            setDistanceGoal(distanceGoal - 10);
          }}
        >
          Decrease Goal
        </Button>
      </ButtonGroup>
      <div>{"Lines Travelled"}</div>
      <ProgressBar
        id="lines"
        min={0}
        max={lineGoal}
        now={currentLines.size}
        label={`${currentLines.size}/${lineGoal}` + " lines travelled"}
        variant="success"
      ></ProgressBar>
      <ButtonGroup>
        <Button
          onClick={() => {
            setLineGoal(lineGoal + 1);
          }}
        >
          Increase Goal
        </Button>
        <Button
          onClick={() => {
            setLineGoal(lineGoal - 1);
          }}
        >
          Decrease Goal
        </Button>
      </ButtonGroup>
      <div>{"States Visited"}</div>
      <ProgressBar
        id="states"
        min={0}
        max={stateGoal}
        now={currentStates.size}
        label={`${currentStates.size}/${stateGoal}` + " states visited"}
        variant="success"
      ></ProgressBar>
      <ButtonGroup>
        <Button
          onClick={() => {
            setStateGoal(stateGoal + 1);
          }}
        >
          Increase Goal
        </Button>
        <Button
          onClick={() => {
            setStateGoal(stateGoal - 1);
          }}
        >
          Decrease Goal
        </Button>
      </ButtonGroup>
      <div>{"Districts Visited"}</div>
      <ProgressBar
        id="districts"
        min={0}
        max={districtGoal}
        now={currentDistricts.size}
        label={
          `${currentDistricts.size}/${districtGoal}` + " districts visited"
        }
        variant="success"
      ></ProgressBar>
      <ButtonGroup>
        <Button
          onClick={() => {
            setDistrictGoal(districtGoal + 1);
          }}
        >
          Increase Goal
        </Button>
        <Button
          onClick={() => {
            setDistrictGoal(districtGoal - 1);
          }}
        >
          Decrease Goal
        </Button>
      </ButtonGroup>
      <div>{"Counties Visited"}</div>
      <ProgressBar
        id="counties"
        min={0}
        max={countyGoal}
        now={currentCounties.size}
        label={`${currentCounties.size}/${countyGoal}` + " counties visited"}
        variant="success"
      ></ProgressBar>
      <ButtonGroup>
        <Button
          onClick={() => {
            setCountyGoal(countyGoal + 1);
          }}
        >
          Increase Goal
        </Button>
        <Button
          onClick={() => {
            setCountyGoal(countyGoal - 1);
          }}
        >
          Decrease Goal
        </Button>
      </ButtonGroup>
      <div>{"City Districts Visited"}</div>
      <ProgressBar
        id="cityDistricts"
        min={0}
        max={cityDistrictGoal}
        now={currentCityDistricts.size}
        label={
          `${currentCityDistricts.size}/${cityDistrictGoal}` +
          " city districts visited"
        }
        variant="success"
      ></ProgressBar>
      <ButtonGroup>
        <Button
          onClick={() => {
            setCityDistrictGoal(cityDistrictGoal + 1);
          }}
        >
          Increase Goal
        </Button>
        <Button
          onClick={() => {
            setCityDistrictGoal(cityDistrictGoal - 1);
          }}
        >
          Decrease Goal
        </Button>
      </ButtonGroup>
    </div>
  );
};
