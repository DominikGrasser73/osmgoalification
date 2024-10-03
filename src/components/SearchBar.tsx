import React, { useState, useContext } from "react";
import { useMapContext } from "./MapContext";
import tramlines from "../data/tramlines.json";
import trainlines from "../data/trainlines.json";
import buslines from "../data/buslines.json";

export default function SearchBar() {
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const { lineID, setLineID, transportMode, lineName, setLineName } =
    useMapContext();

  const handleInputChange = (event: { target: { value: any } }) => {
    const { value } = event.target;
    setSearch(value);
    filterData(value);
  };

  const filterData = (searchTerm: string) => {
    var filteredData2: any[] = [];
    if (transportMode === "tram") {
      filteredData2 = tramlines.filter((value) => {
        return value.name
          .toString()
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
    } else if (transportMode === "train") {
      filteredData2 = trainlines.filter((value) => {
        return value.name
          .toString()
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
    } else if (transportMode === "bus") {
      filteredData2 = buslines.filter((value) => {
        return value.name
          .toString()
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
    }

    setFilteredData(filteredData2);
    console.log("Filtered Data", filteredData2[0].id);
    setLineID(filteredData2[0].id);
    setLineName(filteredData2[0].name);
    console.log("ID", lineID);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search"
        value={search}
        onChange={handleInputChange}
      />
      {filteredData.slice(0, 5).map((item) => {
        return (
          <div key={item.id}>
            <p>{item.name}</p>
          </div>
        );
      })}
    </div>
  );
}
