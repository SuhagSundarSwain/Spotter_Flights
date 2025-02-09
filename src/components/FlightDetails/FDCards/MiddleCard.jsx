import styles from "./MiddleCard.module.css";
import { PiAirplaneInFlightBold } from "react-icons/pi";

function MiddleCard({ duration, type }) {
  return (
    <div className={styles.middle_Card}>
      <p>{duration}</p>
      <PiAirplaneInFlightBold style={{ color: "blue" }} />
      <p>{type}</p>
    </div>
  );
}

export default MiddleCard;
