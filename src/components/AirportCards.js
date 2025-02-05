import { useContext, useEffect, useState } from "react";
import { LocationContext } from "../store/context-store/Location-Context-Store";
import AirportCard from "./AirportCard";
import styles from "./AirportCards.module.css";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

function AirportCards() {
  const [nearByAirportList, setNearByAirportList] = useState(null);
  const { lattitude, longitude } = useContext(LocationContext);

  useEffect(() => {
    fetch(
      process.env.REACT_APP_API_URL +
        `/flights/getNearByAirports?lat=${lattitude}&lng=${longitude}&locale=en-US`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-rapidapi-host": "sky-scrapper.p.rapidapi.com",
          "x-rapidapi-key": process.env.REACT_APP_API_KEY,
        },
      }
    )
      .then((res) => {
        if (!res.ok) throw new Error("Something went wrong.");
        return res.json();
      })
      .then(({ data }) => {
        setNearByAirportList(data.nearby);
      })
      .catch((error) => console.error(error));
  }, [lattitude, longitude]);

  return !nearByAirportList ? (
    <LoadingSpinner title=" finding near by airport"/>
  ) : (
    <div className={styles.airport_cards_container}>
      {nearByAirportList.map(({ presentation }) => (
        <AirportCard
          ariportName={presentation.title}
          ariportLocation={presentation.suggestionTitle}
        />
      ))}
    </div>
  );
}

export default AirportCards;
