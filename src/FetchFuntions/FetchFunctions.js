export const searchAirport = async (keyWord) => {
  try {
    const response = await fetch(
      process.env.REACT_APP_API_URL +
        `/flights/searchAirport?query=${keyWord}&locale=en-US`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-rapidapi-host": process.env.REACT_APP_API_HOST,
          "x-rapidapi-key": process.env.REACT_APP_API_KEY,
          "content-type":"application/json"
        },
      }
    );
    if (!response.ok)
      throw new Error("Something went wrong ! Can't find airport.");
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
    return;
  }
};

export const fetchFlights = async (
  originAirport,
  destinationAirport,
  travelDate
) => {
  const url =
    process.env.REACT_APP_API_URL +
    `/flights/searchFlights?originSkyId=${originAirport.skyId}&destinationSkyId=${destinationAirport.skyId}&originEntityId=${originAirport.entityId}&destinationEntityId=${destinationAirport.entityId}&date=${travelDate}&cabinClass=economy&adults=1&sortBy=best&currency=USD&market=en-US&countryCode=US`;
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-host": process.env.REACT_APP_API_HOST,
      "x-rapidapi-key": process.env.REACT_APP_API_KEY,
    },
  };
  try {
    const response = await fetch(url, options);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
    return;
  }
};
