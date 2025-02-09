import { useContext, useState } from "react";
import FlightResultCard from "./FlightResultCard";
import styles from "./FlightResults.module.css";
import { FlightsContext } from "../../../store/context-store/Flights-Context-Store";

function FlightResults() {
  const { flightList } = useContext(FlightsContext);
  const [sortCriteria, setSortCriteria] = useState("select");

  const sortFlights = (criteria) => {
    let sortedFlights = [...flightList];

    switch (criteria) {
      case "price":
        sortedFlights.sort((a, b) => a.price.total - b.price.total);
        break;
      case "duration":
        sortedFlights.sort(
          (a, b) => a.legs[0].durationInMinutes - b.legs[0].durationInMinutes
        );
        break;
      case "departure":
        sortedFlights.sort(
          (a, b) =>
            new Date(a.legs[0].departure) - new Date(b.legs[0].departure)
        );
        break;
      case "arrival":
        sortedFlights.sort(
          (a, b) => new Date(a.legs[0].arrival) - new Date(b.legs[0].arrival)
        );
        break;
      default:
        break;
    }

    return sortedFlights;
  };

  const sortedFlightList = sortFlights(sortCriteria);

  return (
    <>
      {flightList.length > 0 && (
        <div className={styles.search_flight_list_container}>
          <u className={styles.flight_result_heading}>Flight Results</u>
          <div className={styles.sort_options}>
            <p className={styles.sort_by_text}>Sort By : </p>
            <select
              value={sortCriteria}
              onChange={(e) => setSortCriteria(e.target.value)}
              style={{ borderRadius: "10px" }}
            >
              <option value="select">select</option>
              <option value="price">Price</option>
              <option value="duration">Duration</option>
              <option value="departure">Departure</option>
              <option value="arrival">Arrival</option>
            </select>
          </div>
          <div className={styles.flight_results}>
            {sortedFlightList.map((flightDetail, index) => (
              <FlightResultCard key={index} flightDetail={flightDetail} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default FlightResults;
