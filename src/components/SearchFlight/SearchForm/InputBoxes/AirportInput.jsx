import { MdFlightTakeoff } from "react-icons/md";
import styles from "./AirportInput.module.css";
import { useState } from "react";
import { searchAirport } from "../../../../FetchFuntions/FetchFunctions";

function AirportInput({
  setAirport,
  icon = <MdFlightTakeoff />,
  placeholder = "",
}) {
  const [airportName, setAirportName] = useState("");
  const [suggestionList, setSuggestionList] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleOnChange = async (event) => {
    const keyWord = event.target.value;
    setAirportName(keyWord); // Update the input value
    if (keyWord.length >= 3) {
      const airports = await searchAirport(keyWord);
      if (airports?.status) {
        setSuggestionList(airports?.data || []);
        setShowSuggestions(true);
      } else {
        setShowSuggestions(false);
      }
    } else {
      setShowSuggestions(false);
    }
  };

  return (
    <div className={styles.airport_suggetion_container}>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder={placeholder}
          aria-label={placeholder}
          value={airportName}
          onChange={handleOnChange}
        />
        <span className="input-group-text" id="basic-addon1">
          {icon}
        </span>
      </div>
      {showSuggestions && suggestionList.length > 0 && (
        <ul className={styles.suggestion_list}>
          {suggestionList.map(({ navigation, presentation }, index) => (
            <li
              key={index}
              className={styles.suggestion_title}
              onClick={() => {
                setAirportName(presentation.suggestionTitle);
                setAirport(navigation.relevantFlightParams);
                setShowSuggestions(false);
              }}
            >
              {presentation.suggestionTitle}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AirportInput;
