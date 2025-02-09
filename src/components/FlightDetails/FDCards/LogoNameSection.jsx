import { alterNativeImage } from "../../SearchFlight/FligjtResult/FlightResultCard";
import styles from "./LogoNameSection.module.css";

function LogoNameSection({ airLineLogo, airline = "Airline Name" }) {
  return (
    <div className={styles.logo_name_section}>
      <img
        className={styles.logo_image}
        src={airLineLogo}
        alt={alterNativeImage}
      />
      <p className={styles.airline_name}>{airline}</p>
    </div>
  );
}

export default LogoNameSection;
