import { createContext, useEffect, useState } from "react";

export const LocationContext = createContext({
  lattitude: null,
  longitude: null,
});

const LocationContextProvider = ({ children }) => {
  const [lattitude, setLattitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLattitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (error) => console.error("Error getting location: ", error)
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, [lattitude, longitude]);
  return (
    <LocationContext.Provider
      value={{
        lattitude,
        longitude,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export default LocationContextProvider;
