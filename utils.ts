export const convertSecondsToDaysAndHours = (seconds: number) => {
  const days = Math.floor(seconds / (3600 * 24));
  seconds -= days * 3600 * 24;
  const hrs = Math.floor(seconds / 3600);
  seconds -= hrs * 3600;
  const mnts = Math.floor(seconds / 60);
  seconds -= mnts * 60;
  return `${days} days, ${hrs} Hrs, ${mnts} minutes and ${seconds} seconds.`
}
