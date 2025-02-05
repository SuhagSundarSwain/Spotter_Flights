import styles from "./NearByAirport.module.css";
import AirportCards from "./AirportCards";

function NearByAirport() {
  return (
    <>
      <u className={styles.nba_title}>NearBy Airports</u>
      <AirportCards />
    </>
  );
}

export default NearByAirport;
