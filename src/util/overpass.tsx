import { GeoJsonObject } from "geojson";
import { useState } from "react";

export const BASE_URL = "https://overpass-api.de/api/interpreter";

export type OsmNode = {
  lat: number;
  lon: number;
  tags: [];
  name: string;
  type: string;
  isStation: boolean;
};

export async function fetchData(relation: number): Promise<Object> {
  try {
    const query = `
       [out:json][timeout:25];
      (
        relation(${relation});
      );
      (._;>;);
      out body;
    `;
    const formBody = "data=" + encodeURIComponent(query);
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body: formBody,
    };
    const response = await fetch(`${BASE_URL}`, requestOptions);
    const data = await response.json();
    /*let dataElements = data.elements.map((element: any) => {
      let name = "";
      let isStation = false;
      if (
        element.tags &&
        element.tags.railway &&
        element.tags.railway === "tram_stop"
      ) {
        isStation = true;
      }
      if (element.tags && element.tags.name) {
        name = element.tags.name;
      }
      return {
        lat: element.lat,
        lon: element.lon,
        tags: element.tags,
        type: element.type,
        name: name,
        isStation: isStation,
      };
    });*/
    //console.log("dataElements", data);
    return data;
  } catch (err) {
    console.error(err);
    return Promise.resolve({} as Object);
  }
}

export function getline(relation: number): Promise<GeoJsonObject> {
  try {
    const query = `
      [out:json][timeout:25];
      (
        relation(${relation});
      );
      (._;>;);
      out body;
    `;
    const formBody = "data=" + encodeURIComponent(query);
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body: formBody,
    };
    return fetch(`${BASE_URL}`, requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("data:xd", data);
        return data;
      }) as Promise<GeoJsonObject>; // Add type assertion here
  } catch (err) {
    console.error(err);
    return Promise.resolve({} as GeoJsonObject);
  }
}
