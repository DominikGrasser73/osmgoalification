import React from "react";
import { ProgressBar } from "react-bootstrap";
import { useMapContext } from "./MapContext";

export const BadgeComponent = () => {
  const {
    linesTravelled,
    distance,
    statesVisited,
    districtsVisited,
    countiesVisited,
    cityDistrictsVisited,
  } = useMapContext();
  return (
    <React.Fragment>
      <h1>Badges</h1>
      <h2>States Visited:</h2>
      <ProgressBar
        now={statesVisited.size}
        max={9}
        label={`${statesVisited.size}/9`}
        variant={statesVisited.size < 3 ? "danger" : "success"}
      />
      <h2>Districts Visited: </h2>
      <ProgressBar
        now={districtsVisited.size}
        max={93}
        label={`${districtsVisited.size}/93`}
        variant={districtsVisited.size < 30 ? "danger" : "success"}
      />
      <h2>Counties Visited: </h2>
      <ProgressBar
        now={countiesVisited.size}
        max={2000}
        label={`${countiesVisited.size}/2000`}
        variant={countiesVisited.size < 100 ? "danger" : "success"}
      />
      <h2>City Districts Visited: </h2>
      <ProgressBar
        now={cityDistrictsVisited.size}
        max={100}
        label={`${cityDistrictsVisited.size}/100`}
        variant={cityDistrictsVisited.size < 30 ? "danger" : "success"}
      />

      <h2>Lines Travelled: </h2>
      <ProgressBar
        now={linesTravelled.size}
        max={100}
        label={`${linesTravelled.size}/2000`}
        variant={linesTravelled.size < 30 ? "danger" : "success"}
      />
      <h2>Distance Travelled in Km</h2>
      <ProgressBar
        now={distance}
        max={10000}
        label={`${distance}/10000`}
        variant={distance < 3000 ? "danger" : "success"}
      />
    </React.Fragment>
  );
};
