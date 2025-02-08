import { useContext, useState } from "react";
import AirportInput from "./InputBoxes/AirportInput";
import styles from "./SearchForm.module.css";
import { MdFlightLand, MdFlightTakeoff } from "react-icons/md";
import Calander from "./InputBoxes/Calander";
import { fetchFlights } from "../../../FetchFuntions/FetchFunctions";
import { FlightsContext } from "../../../store/context-store/Flights-Context-Store";

function SearchForm() {
  const [fromAirport, setFromAirport] = useState({});
  const [destAirport, setDestAirport] = useState({});
  const [travelDate, setTravelDate] = useState("");

  const { setFlightList, setFlightSearching } = useContext(FlightsContext);

  const handleSearchFlightButton = async () => {
    setFlightSearching(true);
    const flightListReult = await fetchFlights(
      fromAirport,
      destAirport,
      travelDate
    );
    if (flightListReult.status) {
      setFlightList(flightListReult.data.itineraries);
    } else {
      setFlightList([]);
    }
    setFlightSearching(false);
  };

  return (
    <>
      <div className={styles.search_flight_input_container}>
        <AirportInput
          setAirport={setFromAirport}
          icon={<MdFlightTakeoff />}
          placeholder="From"
        />
        <AirportInput
          setAirport={setDestAirport}
          icon={<MdFlightLand />}
          placeholder="To"
        />
        <Calander
          originSkyId={fromAirport.skyId}
          destSkyId={destAirport.skyId}
          value={travelDate}
          setValue={setTravelDate}
        />
      </div>

      <button
        type="button"
        className={`btn btn-primary ${styles.search_flight_button}`}
        onClick={handleSearchFlightButton}
      >
        Search Flights
      </button>
    </>
  );
}

export default SearchForm;
