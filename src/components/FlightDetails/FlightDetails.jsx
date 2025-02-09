import { useContext } from "react";
import DepartureArrivalCard from "./FDCards/Departure_arrival_Card";
import LogoNameSection from "./FDCards/LogoNameSection";
import MiddleCard from "./FDCards/MiddleCard";
import styles from "./FlightDetails.module.css";
import { FlightsContext } from "../../store/context-store/Flights-Context-Store";
import { IoIosClose } from "react-icons/io";
import {
  convertMinutesToHoursMinutes,
  spiltDateAndTime,
} from "../SearchFlight/FligjtResult/HelpFunctions";

function FlightDetails() {
  const { flightCard, setShowFlightDetails } = useContext(FlightsContext);
  return (
    <div className={styles.flight_details}>
      <IoIosClose
        className={styles.close_icon}
        onClick={() => setShowFlightDetails(false)}
      />
      <p className={styles.card_title}>FlightDetails</p>
      <div className={styles.flight_travel_detail}>
        <div>
          <p className={styles.origin_destination_text}>
            {flightCard.legs[0].origin.city} to{" "}
            {flightCard.legs[0].destination.city}
          </p>
          <p className={styles.date_text}>
            {spiltDateAndTime(flightCard.legs[0].departure)[0]}
          </p>
        </div>
        <div className={styles.price}>{flightCard.price.formatted}</div>
      </div>
      <div className={styles.all_detail_card}>
        <div className={styles.detail_card}>
          <DepartureArrivalCard
            title="Departure"
            time={spiltDateAndTime(flightCard.legs[0].departure)[1]}
            airport={`${flightCard.legs[0].origin.city} (${flightCard.legs[0].origin.displayCode})`}
          />
          <MiddleCard
            duration={convertMinutesToHoursMinutes(
              flightCard.legs[0].durationInMinutes
            )}
            type={"direct"}
          />
          <DepartureArrivalCard
            title="Arrival"
            time={spiltDateAndTime(flightCard.legs[0].arrival)[1]}
            airport={`${flightCard.legs[0].destination.name} (${flightCard.legs[0].destination.displayCode})`}
          />
        </div>
        <LogoNameSection
          airLineLogo={flightCard.legs[0].carriers.marketing[0].logoUrl}
          airline={flightCard.legs[0].carriers.marketing[0].name}
        />
      </div>
    </div>
  );
}

export default FlightDetails;
