import { useContext } from "react";
import FlightResults from "./FligjtResult/FlightResults";
import styles from "./SearchFlight.module.css";
import SearchForm from "./SearchForm/SearchForm";
import { FlightsContext } from "../../store/context-store/Flights-Context-Store";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";

function SearchFlight() {
  const { flightSearching } = useContext(FlightsContext);
  return (
    <>
      <div className={styles.search_flight_container}>
        SearchFlight
        <SearchForm />
      </div>
      {flightSearching && <LoadingSpinner title="Searching Flights..."/>}
      <FlightResults />
    </>
  );
}

export default SearchFlight;
