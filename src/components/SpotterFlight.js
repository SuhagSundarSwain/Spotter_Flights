import styles from "./SpotterFlight.module.css";
import NearByAirport from "./NearByAirports/NearByAirport";

function SpotterFlight() {
  return (
    <div className={styles.spotter_flight_container}>
      <h1 className={styles.title}>Spotter Flights</h1>
      <NearByAirport />
    </div>
  );
}

export default SpotterFlight;
