export const getGeneralInfo = (points) => {
  const getTotalPrice = () => {
    const sums = [];

    points.forEach((point) => {
      const { basePrice } = point;

      sums.push(basePrice);
    });

    return sums.reduce((sum, current) => sum + current);
  };

  const getDestinations = () => {
    const set = new Set();

    points.forEach((point) => {
      const {destination} = point;
      const {name} = destination;

      set.add(name);
    });

    const destinations = Array.from(set);
    const firstDestination = points[0].destination.name;
    const lastDestination = points[points.length - 1].destination.name;
    const isOneDestination = !destinations[1];
    const isRouteEndsAtTheSamePlace = firstDestination === lastDestination;

    if (isOneDestination) {
      return destinations;
    }

    if (isRouteEndsAtTheSamePlace) {
      destinations.push(firstDestination);
    }

    return destinations;
  };

  const getRouteDates = () => {
    const { dateFrom: startDate } = points[0];
    const { dateTo: endDate } = points[points.length - 1];
    const isTheSameMonth = startDate.format('MMM') === endDate.format('MMM');

    if (isTheSameMonth) {
      return {
        startDate: startDate.format('MMM D'),
        endDate: endDate.format('D'),
      };
    }

    return {
      startDate: startDate.format('MMM D'),
      endDate: endDate.format('MMM D'),
    };
  };

  const totalPrice = getTotalPrice();
  const destinations = getDestinations();
  const dates = getRouteDates();

  return {
    totalPrice,
    destinations,
    dates,
  };
};

