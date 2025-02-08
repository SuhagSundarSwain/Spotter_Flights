import styles from "./FlightResultCard.module.css";
import {
  convertMinutesToHoursMinutes,
  spiltDateAndTime,
} from "./HelpFunctions";

const alterNativeImage =
  "https://w7.pngwing.com/pngs/503/7/png-transparent-airplane-logo-flight-attendant-air-travel-airplane-aviation-avion-text-logo-flight-thumbnail.png";

function FlightResultCard({ flightDetail }) {
  return (
    <div className={styles.flight_card}>
      <img
        src={flightDetail.legs[0].carriers.marketing[0].logoUrl}
        alt={alterNativeImage}
      />
      <p>{`${flightDetail.legs[0].origin.id}✈️${flightDetail.legs[0].destination.id}`}</p>
      <div className={styles.flight_card_info}>
        <p>{flightDetail.legs[0].carriers.marketing[0].name}</p>
        <div className={styles.flight_card_dates}>
          <p>{spiltDateAndTime(flightDetail.legs[0].departure)}</p>
          <p>{spiltDateAndTime(flightDetail.legs[0].arrival)}</p>
        </div>
        <p className={styles.flight_card_duration}>
          {convertMinutesToHoursMinutes(flightDetail.legs[0].durationInMinutes)}
        </p>
      </div>
      <p className={styles.flight_card_price}>{flightDetail.price.formatted}</p>
    </div>
  );
}

export default FlightResultCard;
