import { createContext, useState } from "react";

export const FlightsContext = createContext({
  flightList: [],
  setFlightList: () => {},
  flightSearching: false,
  setFlightSearching: () => {},
  showFlightDetails: false,
  setShowFlightDetails: () => {},
  flightCard: {},
  setFlightCard: () => {},
});

const FlightsContextProvider = ({ children }) => {
  const [flightList, setFlightList] = useState([]);
  const [flightSearching, setFlightSearching] = useState(false);
  const [showFlightDetails, setShowFlightDetails] = useState(false);
  const [flightCard, setFlightCard] = useState({});

  return (
    <FlightsContext.Provider
      value={{
        flightList,
        setFlightList,
        flightSearching,
        setFlightSearching,
        showFlightDetails,
        setShowFlightDetails,
        flightCard,
        setFlightCard,
      }}
    >
      {children}
    </FlightsContext.Provider>
  );
};

export default FlightsContextProvider;
