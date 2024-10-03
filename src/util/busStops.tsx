const BASE_URL = "https://overpass-api.de/api/interpreter";
export type busStop = {
  lat: number;
  lon: number;
  tags: {
    name: string[];
  };
};
export const getBusStops = async (): Promise<busStop[]> => {
  try {
    const query = `
      [out:json][timeout:25];
      (node[${"highway"}=${"bus_stop"}](around:5000, ${48.33}, ${14.23}););
      out;
      >;
      out skel qt;
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
    console.log("data:xd", data);

    let dataElements = data.elements.map((element: any) => {
      return {
        lat: element.lat,
        lon: element.lon,
        tags: { name: element.tags.name },
      };
    });

    return dataElements;
  } catch (err) {
    console.error(err);
    return [];
  }
};
