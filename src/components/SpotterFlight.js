import styles from "./SpotterFlight.module.css";
import NearByAirport from "./NearByAirports/NearByAirport";
import { useContext } from "react";
import { LocationContext } from "../store/context-store/Location-Context-Store";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import SearchFlight from "./SearchFlight/SearchFlight";
import FlightsContextProvider from "../store/context-store/Flights-Context-Store";

function SpotterFlight() {
  const { lattitude, longitude } = useContext(LocationContext);
  return (
    <div className={styles.spotter_flight_container}>
      <h1 className={styles.title}>Spotter Flights</h1>
      {lattitude === null || longitude === null ? (
        <LoadingSpinner title="fetching location" />
      ) : (
        <NearByAirport />
      )}
      <FlightsContextProvider>
        <SearchFlight />
      </FlightsContextProvider>
    </div>
  );
}

export default SpotterFlight;
