import { limitOffersToShow, chooseRightPreposition, getDatetimeFormat, humanizeDate } from '../utils';

const createSelectedOffers = (offers) => {
  return offers.map((offer) => {
    const {title, price} = offer;

    return `<li class="event__offer">
    <span class="event__offer-title">${title}</span>
    &plus;
    &euro;&nbsp;<span class="event__offer-price">${price}</span>
  </li>`;
  }).join('');
};

export const createEventTemplate = (point) => {
  const {
    basePrice,
    dateFrom,
    dateTo,
    difference,
    destination,
    offers,
    type,
  } = point;

  const {
    name,
  } = destination;

  const preposition = chooseRightPreposition(type);
  const datetimeFrom = getDatetimeFormat(dateFrom);
  const datetimeTo = getDatetimeFormat(dateTo);
  const timeFrom = humanizeDate(dateFrom);
  const timeTo = humanizeDate(dateTo);
  const limitedOffers = limitOffersToShow(offers);
  const selectedOffers = createSelectedOffers(limitedOffers);

  return `<li class="trip-events__item">
    <div class="event">
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${type} ${preposition} ${name}</h3>

      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="${datetimeFrom}">${timeFrom}</time>
          &mdash;
          <time class="event__end-time" datetime="${datetimeTo}">${timeTo}</time>
        </p>
        <p class="event__duration">${difference}</p>
      </div>

      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
      </p>

      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
        ${selectedOffers}
      </ul>

      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>`;
};
