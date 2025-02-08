import { CiAirportSign1 } from "react-icons/ci";
import styles from "./AirportCard.module.css";

function AirportCard({
  ariportName = "airpot name",
  ariportLocation = "airtport Location",
}) {
  return (
    <div className={styles.nba_card}>
      <CiAirportSign1 className={styles.nba_icon} />
      <p className={styles.nba_card_name}>{ariportName}</p>
      <p className={styles.nba_card_location}> {ariportLocation}</p>
    </div>
  );
}

export default AirportCard;
