import { MapContainer, TileLayer, useMap } from "react-leaflet";
import tileLayer from "../util/tileLayer";
import osmtogeojson from "osmtogeojson";
import { LatLngTuple, circleMarker } from "leaflet";
import "leaflet/dist/leaflet.css";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { useEffect, useState } from "react";
import { fetchData, getline } from "../util/overpass";
import { useMapContext } from "./MapContext";
import { getCoordinateInfos } from "./CoordinateInfos";
import { GeoJSON } from "react-leaflet";
import { GeoJsonObject } from "geojson";

const center: LatLngTuple = [48.3333, 14.324];

export const MapWrapper = () => {
  const [apiData, setApiData] = useState<GeoJsonObject>({} as GeoJsonObject);
  const [loading, setLoading] = useState(true);
  const {
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
  } = useMapContext();
  const [linekey, setLineKey] = useState(0);
  const [distanceChanged, setDistanceChanged] = useState(false);
  const [nodes, setNodes] = useState<LatLngTuple[]>([]);

  useEffect(() => {
    const fetchEffect = async () => {
      const data = await fetchData(lineID);
      setApiData(osmtogeojson(data as any) as GeoJsonObject);
      setLoading(false);
    };
    fetchEffect();
  }, []);

  function updateMap() {
    fetchData(lineID).then(function (data) {
      setApiData(osmtogeojson(data as any) as GeoJsonObject);
      console.log("data fetched", lineID, linekey);
      setLineKey(linekey + 1);
    });
  }

  function onEachFeature(feature: any, layer: any) {
    if (
      feature.properties.railway === "tram_stop" ||
      feature.properties.highway === "bus_stop" ||
      feature.properties.railway === "station" ||
      feature.properties.railway === "stop"
    ) {
      layer.bindPopup(feature.properties.name);
      layer.on("click", function () {
        setNodes((nodes) => [...nodes, layer.getLatLng()]);
      });
    }
  }
  const MapController = () => {
    const map = useMap();
    map.on("keypress", function (e) {
      if (e.originalEvent.key === "q") {
        setDistanceChanged(true);
      }
    });
    useEffect(() => {
      if (distanceChanged) {
        if (nodes && nodes.length > 1) {
          var nodeOne = nodes[nodes.length - 2];
          var nodeTwo = nodes[nodes.length - 1];
          if (nodeOne[0] !== 0 && nodeTwo[0] !== 0) {
            setDistanceChanged(false);

            var distanceValue = Math.round(map.distance(nodeOne, nodeTwo));

            if (linesTravelled.has(lineName)) {
              setLinesTravelled(
                linesTravelled.set(
                  lineName,
                  (linesTravelled.get(lineName) ?? 0) + 1
                )
              );
            } else {
              setLinesTravelled(linesTravelled.set(lineName, 1));
            }

            getCoordinateInfos(nodeTwo).then((data) => {
              data.elements.forEach(
                (element: { tags: { admin_level: string; name: string } }) => {
                  if (element.tags.admin_level === "4") {
                    if (statesVisited.has(element.tags.name)) {
                      setStatesVisited(
                        statesVisited.set(
                          element.tags.name,
                          (statesVisited.get(element.tags.name) ?? 0) + 1
                        )
                      );
                    } else {
                      setStatesVisited(statesVisited.set(element.tags.name, 1));
                    }
                    if (currentStates.has(element.tags.name)) {
                      setCurrentStates(
                        currentStates.set(
                          element.tags.name,
                          (currentStates.get(element.tags.name) ?? 0) + 1
                        )
                      );
                    } else {
                      setCurrentStates(currentStates.set(element.tags.name, 1));
                    }
                  } else if (element.tags.admin_level === "6") {
                    if (districtsVisited.has(element.tags.name)) {
                      setDistrictsVisited(
                        districtsVisited.set(
                          element.tags.name,
                          (districtsVisited.get(element.tags.name) ?? 0) + 1
                        )
                      );
                    } else {
                      setDistrictsVisited(
                        districtsVisited.set(element.tags.name, 1)
                      );
                    }
                    if (currentDistricts.has(element.tags.name)) {
                      setCurrentDistricts(
                        currentDistricts.set(
                          element.tags.name,
                          (currentDistricts.get(element.tags.name) ?? 0) + 1
                        )
                      );
                    } else {
                      setCurrentDistricts(
                        currentDistricts.set(element.tags.name, 1)
                      );
                    }
                  } else if (element.tags.admin_level === "8") {
                    if (countiesVisited.has(element.tags.name)) {
                      setCountiesVisited(
                        countiesVisited.set(
                          element.tags.name,
                          (countiesVisited.get(element.tags.name) ?? 0) + 1
                        )
                      );
                    } else {
                      setCountiesVisited(
                        countiesVisited.set(element.tags.name, 1)
                      );
                    }
                    if (currentCounties.has(element.tags.name)) {
                      setCurrentCounties(
                        currentCounties.set(
                          element.tags.name,
                          (currentCounties.get(element.tags.name) ?? 0) + 1
                        )
                      );
                    } else {
                      setCurrentCounties(
                        currentCounties.set(element.tags.name, 1)
                      );
                    }
                  } else if (
                    element.tags.admin_level === "9" ||
                    element.tags.admin_level === "10"
                  ) {
                    if (cityDistrictsVisited.has(element.tags.name)) {
                      setCityDistrictsVisited(
                        cityDistrictsVisited.set(
                          element.tags.name,
                          (cityDistrictsVisited.get(element.tags.name) ?? 0) + 1
                        )
                      );
                    } else {
                      setCityDistrictsVisited(
                        cityDistrictsVisited.set(element.tags.name, 1)
                      );
                    }
                    if (currentCityDistricts.has(element.tags.name)) {
                      setCurrentCityDistricts(
                        currentCityDistricts.set(
                          element.tags.name,
                          (currentCityDistricts.get(element.tags.name) ?? 0) + 1
                        )
                      );
                    } else {
                      setCurrentCityDistricts(
                        currentCityDistricts.set(element.tags.name, 1)
                      );
                    }
                  }
                }
              );

              console.log(statesVisited, "statesVisited");
              console.log(districtsVisited, "districtsVisited");
              console.log(countiesVisited, "countiesVisited");
              console.log(cityDistrictsVisited, "cityDistrictsVisited");
              console.log(linesTravelled, "linesTravelled");
            });
            setDistance(distanceValue / 1000 + distance);
            setCurrentDistance(distanceValue / 1000 + currentDistance);
            setDistanceChanged(false);
            if (currentLines.has(lineName)) {
              setCurrentLines(
                currentLines.set(
                  lineName,
                  (currentLines.get(lineName) ?? 0) + 1
                )
              );
            } else {
              setCurrentLines(currentLines.set(lineName, 1));
            }
          }
        }
      }
    }, [distanceChanged, statesVisited]);

    return <></>;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <MapContainer
        center={center}
        zoom={15}
        scrollWheelZoom={true}
        style={{ height: "50vh", width: "100wh" }}
      >
        <TileLayer {...tileLayer} />
        <GeoJSON
          data={apiData as GeoJsonObject}
          key={linekey}
          onEachFeature={onEachFeature}
          pointToLayer={(feature, latlng) => {
            if (
              feature.properties.railway === "tram_stop" ||
              feature.properties.highway === "bus_stop" ||
              feature.properties.railway === "station" ||
              feature.properties.railway === "stop"
            ) {
              return circleMarker(latlng, {
                radius: 6,
                fillColor: "#ff7800",
                color: "#000",
                weight: 1,
                opacity: 1,
                fillOpacity: 0.7,
              });
            } else {
              return circleMarker(latlng, {
                radius: 0,
                fillColor: "#ff7800",
                color: "#000",
                weight: 0,
                opacity: 0,
                fillOpacity: 0,
              });
            }
          }}
          style={{ color: getColor(lineName, linesTravelled), weight: 5 }}
        />

        {}
        <MapController />
      </MapContainer>
      <ButtonGroup>
        <Button
          onClick={() => {
            updateMap();
          }}
        >
          Update
        </Button>
        <Button
          onClick={() => {
            setSaveData(true);
          }}
        >
          Save
        </Button>
        <Button
          onClick={() => {
            localStorage.clear();
            console.log("Data Cleared");
          }}
        >
          Delete Data
        </Button>
      </ButtonGroup>
    </div>
  );
};

export function getColor(
  lineName: string,
  linesTravelled: Map<string, number>
): string {
  const value = linesTravelled.get(lineName);
  if (value !== undefined) {
    if (value >= 100) {
      return "gold";
    } else if (value >= 10) {
      return "red";
    } else if (value >= 5) {
      return "orange";
    } else {
      return "yellow";
    }
  } else {
    return "green";
  }
}
