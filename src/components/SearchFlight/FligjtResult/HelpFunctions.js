export const convertMinutesToHoursMinutes = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours} hr ${mins} min`;
};

export const spiltDateAndTime = (input) => {
  const data = input.split("T");
  return data;
};

