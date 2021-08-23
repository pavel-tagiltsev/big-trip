const chooseRightProposition = (type) => {

  const Preposition = {
    'taxi': 'to',
    'bus': 'to',
    'train': 'to',
    'ship': 'to',
    'transport': 'to',
    'drive': 'to',
    'flight': 'to',
    'check-in': 'in',
    'sightseeing': 'in',
    'restaurant': 'in',
  };

  return Preposition[type];
};

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
    base_price: basePrice,
    date_from: dateFrom,
    date_to: dateTo,
    destination,
    offers,
    type,
  } = point;

  const {
    name: cityName,
  } = destination;

  const getDiff = (from, to) => {
    const diffInMins = to.diff(from, 'minute');
    const diffInHours = to.diff(from, 'hour');
    const diffInDays = to.diff(from, 'days');

    const getMins = () => {
      const mins = diffInMins - diffInHours * 60;

      return mins === 0 ? '' : `${mins}M` ;
    };

    const getHours = () => {
      const hours = diffInHours - diffInDays * 24;

      return hours === 0 ? '' : `${hours}H` ;
    };

    if (diffInHours === 0) {
      return `${to.diff(from, 'minute')}M`;
    }

    if (diffInHours >= 1 && diffInHours <= 23) {
      return `${diffInHours}H ${diffInMins - diffInHours * 60}M`;
    }

    if (diffInDays >= 1) {
      return `${diffInDays}D ${getHours()} ${getMins()}`;
    }
  };

  const diff = getDiff(dateFrom, dateTo);

  const limitOffers = () => {
    return offers.length > 3 ? offers.slice(0, 3) : offers;
  };

  return `<li class="trip-events__item">
    <div class="event">
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${type} ${chooseRightProposition(type)} ${cityName}</h3>

      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="${dateFrom.format('YYYY-MM-DDTHH:mm:ssZ')}">${dateFrom.format('H:mm')}</time>
          &mdash;
          <time class="event__end-time" datetime="${dateTo.format('YYYY-MM-DDTHH:mm:ssZ')}">${dateTo.format('H:mm')}</time>
        </p>
        <p class="event__duration">${diff}</p>
      </div>

      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
      </p>

      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
        ${createSelectedOffers(limitOffers(offers))}
      </ul>

      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>`;
};
