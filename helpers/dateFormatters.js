
export function secondsToTime(seconds) {
  
  let hoursDecimal = seconds / 60 / 60
  let hours = Math.floor(hoursDecimal);
  let minutesDecimal = (hoursDecimal - hours) * 60;
  let minutes = Math.round(minutesDecimal);
  const ampm = hours >= 12 ? 'pm' : 'am';

  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? '0' + minutes : minutes;

  return `${hours}:${minutes}${ampm}`;
}