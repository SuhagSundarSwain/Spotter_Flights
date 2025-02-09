import styles from "./DepartureArrivalCard.module.css";

function DepartureArrivalCard({
  title = "Title",
  time = "hh:mm",
  airport = "Airport (AIR)",
}) {
  return (
    <div>
      <p className={styles.departure_arrival_title}>{title}</p>
      <p className={styles.time}>{time}</p>
      <p className={styles.airport_name}>{airport}</p>
    </div>
  );
}

export default DepartureArrivalCard;
