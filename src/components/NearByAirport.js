import styles from "./NearByAirport.module.css";
import AirportCards from "./AirportCards";

function NearByAirport() {
  return (
    <>
      <h3 className={styles.nba_title}>NearBy Airports</h3>
      <AirportCards />
    </>
  );
}

export default NearByAirport;
