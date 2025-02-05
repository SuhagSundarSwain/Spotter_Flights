import { useContext } from "react";
import SpotterFlight from "./components/SpotterFlight";
import { LocationContext } from "./store/context-store/Location-Context-Store";
import LoadingSpinner from "./LoadingSpinner/LoadingSpinner";

function App() {
  const { lattitude, longitude } = useContext(LocationContext);
  return lattitude === null || longitude === null ? (
    <LoadingSpinner title="fetching location" />
  ) : (
    <SpotterFlight />
  );
}

export default App;
