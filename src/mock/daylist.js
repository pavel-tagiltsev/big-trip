export const findDays = (points) => {
  const dates = new Set();
  const datetimes = new Set();

  points.forEach((point) => {
    const { dateFrom } = point;

    dates.add(dateFrom.format('MMM D'));
    datetimes.add(dateFrom.format('YYYY-MM-DD'));
  });

  return {
    dates: Array.from(dates),
    datetimes: Array.from(datetimes),
  };
};

