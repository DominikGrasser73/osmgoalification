import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { useMapContext } from "./MapContext";

export default function TransportModeButton() {
  const { transportMode, setTransportMode } = useMapContext();

  return (
    <ButtonGroup>
      <Button
        onClick={() => setTransportMode("tram")}
        variant={transportMode === "tram" ? "success" : "primary"}
      >
        Tram
      </Button>
      <Button
        onClick={() => setTransportMode("train")}
        variant={transportMode === "train" ? "success" : "primary"}
      >
        Train
      </Button>
      <Button
        onClick={() => setTransportMode("bus")}
        variant={transportMode === "bus" ? "success" : "primary"}
      >
        Bus
      </Button>
    </ButtonGroup>
  );
}
