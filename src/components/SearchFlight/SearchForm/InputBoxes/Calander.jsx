import { useState, useRef, useCallback } from "react";
import { MdDateRange } from "react-icons/md";
import styles from "./Calander.module.css";

function Calander({ originSkyId, destSkyId, value, setValue }) {
  const [showCalendar, setShowCalendar] = useState(false);
  const [monthsData, setMonthsData] = useState([]);
  const [prices, setPrices] = useState({});
  const calendarRef = useRef(null);

  const weekDays = ["S", "M", "T", "W", "T", "F", "S"];

  const fetchPrices = useCallback(
    async (year, month) => {
      const fromDate = `${year}-${(month + 1).toString().padStart(2, "0")}-01`;
      const url =
        process.env.REACT_APP_API_URL +
        `/flights/getPriceCalendar?originSkyId=${originSkyId}&destinationSkyId=${destSkyId}&fromDate=${fromDate}&currency=USD`;

      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "X-RapidAPI-Key": process.env.REACT_APP_API_KEY,
            "X-RapidAPI-Host": process.env.REACT_APP_API_HOST,
          },
        });
        const data = await response.json();

        if (data.status) {
          const newPrices = {};
          const newMonthsData = {};

          data.data.flights.days.forEach(({ day, price }) => {
            const date = new Date(day);
            const key = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
            newPrices[key] = `$${price}`;

            if (!newMonthsData[`${date.getFullYear()}-${date.getMonth()}`]) {
              newMonthsData[`${date.getFullYear()}-${date.getMonth()}`] =
                generateCalendar(date.getFullYear(), date.getMonth());
            }
          });

          setPrices((prev) => ({ ...prev, ...newPrices }));
          setMonthsData((prev) => [
            ...prev,
            ...Object.entries(newMonthsData).map(([key, days]) => {
              const [y, m] = key.split("-").map(Number);
              return { year: y, month: m, days };
            }),
          ]);
        }
      } catch (error) {
        console.error("Error fetching prices:", error);
      }
    },
    [originSkyId, destSkyId]
  );

  const generateCalendar = (year, month) => {
    const firstDayIndex = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    return [
      ...Array(firstDayIndex).fill(null),
      ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
    ];
  };

  const handleScroll = (e) => {
    if (
      e.target.scrollHeight - e.target.scrollTop <=
      e.target.clientHeight + 10
    ) {
      const lastMonth = monthsData[monthsData.length - 1];
      if (lastMonth) {
        fetchPrices(
          lastMonth.month === 11 ? lastMonth.year + 1 : lastMonth.year,
          (lastMonth.month + 1) % 12
        );
      }
    }
  };

  const isPastDate = (year, month, day) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const date = new Date(year, month, day);
    return date < today;
  };

  const handleOnclick = () => {
    if (monthsData.length === 0) {
      const currentDate = new Date();
      fetchPrices(currentDate.getFullYear(), currentDate.getMonth());
    }
    setShowCalendar(!showCalendar);
  };

  return (
    <div className={styles.date_container}>
      <div className="input-group mb-3" onClick={handleOnclick}>
        <input
          type="text"
          className="form-control"
          placeholder="dd-mm-yyyy"
          value={value}
          readOnly
        />
        <span className="input-group-text">
          <MdDateRange />
        </span>
      </div>

      {showCalendar && (
        <div
          className={styles.calendar_container}
          onScroll={handleScroll}
          ref={calendarRef}
        >
          {monthsData.map(({ year, month, days }, index) => (
            <div key={index} className={styles.month_section}>
              <h4 className={styles.month_header}>
                {new Date(year, month).toLocaleString("default", {
                  month: "long",
                  year: "numeric",
                })}
              </h4>
              <div className={styles.weekday_names_container}>
                {weekDays.map((day, index) => (
                  <p key={index} className={styles.weekday_names}>
                    {day}
                  </p>
                ))}
              </div>
              <div className={styles.calendar_dates}>
                {days.map((day, index) => {
                  if (day === null) {
                    return <div key={index} className={styles.empty_box}></div>;
                  }
                  const pastDate = isPastDate(year, month, day);
                  return (
                    <div
                      key={`${year}-${month}-${day}`}
                      className={
                        pastDate ? styles.disabled_date_box : styles.date_box
                      }
                      onClick={() => {
                        if (!pastDate) {
                          setValue(
                            `${year}-${(month + 1)
                              .toString()
                              .padStart(2, "0")}-${day
                              .toString()
                              .padStart(2, "0")}`
                          );

                          setShowCalendar(false);
                        }
                      }}
                    >
                      {day}
                      <span className={styles.priceText}>
                        {prices[`${year}-${month}-${day}`] || "-"}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Calander;
