import { createContext, useState } from "react";

export const FlightsContext = createContext({
  flightList: [],
  setFlightList: () => {},
  flightSearching: false,
  setFlightSearching: () => {},
});

const FlightsContextProvider = ({ children }) => {
  const [flightList, setFlightList] = useState([]);
  const [flightSearching, setFlightSearching] = useState(false);

  return (
    <FlightsContext.Provider
      value={{ flightList, setFlightList, flightSearching, setFlightSearching }}
    >
      {children}
    </FlightsContext.Provider>
  );
};

export default FlightsContextProvider;
