import { useContext, useEffect, useState } from "react";
import { LocationContext } from "../../store/context-store/Location-Context-Store";
import AirportCard from "./AirportCard";
import styles from "./AirportCards.module.css";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";

function AirportCards() {
  const [nearByAirportList, setNearByAirportList] = useState(null);
  const { lattitude, longitude } = useContext(LocationContext);
  const [visibleAirports, setVisibleAirports] = useState(3);

  useEffect(() => {
    if (lattitude && longitude) {
      fetch(
        process.env.REACT_APP_API_URL +
          `/flights/getNearByAirports?lat=${lattitude}&lng=${longitude}&locale=en-US`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-rapidapi-host": process.env.REACT_APP_API_HOST,
            "x-rapidapi-key": process.env.REACT_APP_API_KEY,
          },
        }
      )
        .then((res) => res.json())
        .then(({ data }) => setNearByAirportList(data.nearby))
        .catch((error) => console.error(error));
    }
  }, [lattitude, longitude]);

  const handleShow = () => {
    setVisibleAirports(
      visibleAirports === 3 ? nearByAirportList.length : 3
    );
  };

  return !nearByAirportList ? (
    <LoadingSpinner title="Finding nearby airports..." />
  ) : (
    <>
      <div className={styles.airport_cards_container}>
        {nearByAirportList.slice(0, visibleAirports).map(({ presentation }, index) => (
          <AirportCard
            key={index}
            ariportName={presentation.title}
            ariportLocation={presentation.suggestionTitle}
          />
        ))}
      </div>
      {nearByAirportList.length > 3 && (
        <button
          type="button"
          className="btn btn-primary"
          style={{ margin: "10px" }}
          onClick={handleShow}
        >
          {visibleAirports < nearByAirportList.length
            ? "Show More Nearby Airports"
            : "Show Less"}
        </button>
      )}
    </>
  );
}

export default AirportCards;
