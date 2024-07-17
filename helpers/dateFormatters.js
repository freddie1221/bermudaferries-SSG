
export function secondsToTime(seconds) {
  
  const date = new Date(seconds * 1000);


  // Convert to ADT (UTC-3)
  date.setUTCHours(date.getUTCHours() - 3);
  
  let hours = date.getUTCHours();
  let minutes = date.getUTCMinutes();
  const ampm = hours >= 12 ? 'pm' : 'am';

  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? '0' + minutes : minutes;

  return `${hours}:${minutes}${ampm}`;
}