import { getGeneralInfo } from '../mock/trip-info';

const createRoute = (destinations) => {
  return destinations.map((destination) => {
    return `${destination} `;
  }).join('&mdash; ');
};

export const createTripInfoTemplate = (points) => {
  const generalInfo = getGeneralInfo(points);
  const { totalPrice, destinations, dates } = generalInfo;
  const { startDate, endDate } = dates;

  return `<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">${createRoute(destinations)}</h1>

      <p class="trip-info__dates">${startDate}&nbsp;&mdash;&nbsp;${endDate}</p>
    </div>

    <p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalPrice}</span>
    </p>
  </section>`;
};
