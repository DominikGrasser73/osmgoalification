import { LatLngLiteral, LatLngTuple } from "leaflet";
import { BASE_URL } from "../util/overpass";

export async function getCoordinateInfos(coords: LatLngTuple) {
  try {
    var value = coords as unknown as LatLngLiteral;
    const query = `
          [out:json][timeout:25];
          is_in(${value.lat}, ${value.lng});
          area._[admin_level~"^(4|6|8|9|10)$"];
          (._;>;);
          out ;
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
    return data;
  } catch (err) {
    console.error(err);
  }
}
