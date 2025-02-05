import styles from "./LoadingSpinner.module.css";
function LoadingSpinner({ title = "Loading" }) {
  return (
    <div className={styles.loadingSpinner}>
      <div className="spinner-grow" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <h5 style={{ color: "grey" }}>{title}</h5>
    </div>
  );
}

export default LoadingSpinner;
