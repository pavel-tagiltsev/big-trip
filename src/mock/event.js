import dayjs from 'dayjs';
import {
  getRandomPositiveNumber,
  getRandomArrayElement,
  getArrayRandomLength,
  roundMins,
  getRandomPrice
} from '../utils';

const TYPES = [
  'taxi',
  'bus',
  'train',
  'ship',
  'transport',
  'drive',
  'flight',
  'check-in',
  'sightseeing',
  'restaurant',
];

const DESCRIPTIONS = [
  `Lorem ipsum dolor
  sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta
  ligula feugiat eget. Fusce tristique
  felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.
  Nullam nunc ex, convallis sed finibus
  eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed
  nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam
  faucibus, purus ex euismod diam, eu
  luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed
  felis. Aliquam erat volutpat.`,
  `Nunc fermentum tortor ac porta dapibus. In
  rutrum ac purus sit amet tempus.`,
];

const CITY_NAMES = [
  'Helsinki',
  'Stockholm',
  'Oslo',
  'Tallinn',
  'Riga',
  'Copenhagen',
  'Hamburg',
  'Berlin',
  'Vienna',
  'London',
];

const OFFER_TITLES = [
  'Choose meal',
  'Upgrade to comfort class',
  'Rent a car',
  'Book tickets',
  'Lunch in city',
  'Add luggage',
  'Switch to comfort',
  'Add breakfast',
  'Order Uber',
];

const MIN_OFFER_PRICE = 50;
const MAX_OFFER_PRICE = 300;

const MIN_BASE_PRICE = 500;
const MAX_BASE_PRICE = 3000;

const NUMBER_OF_OFFERS = 5;
const NUMBER_OF_PICTURES = 5;

const TIMELINE_START_IN_MINS_AGO = 2880;
const TIMELINE_STEP_IN_MINS_MIN = 30;
const TIMELINE_STEP_IN_MINS_MAX = 420;

const START_DESTINATION_NAME = getRandomArrayElement(CITY_NAMES);
const MIDDLE_DESTINATION_NAME = getRandomArrayElement(CITY_NAMES);
const END_DESTINATION_NAME = getRandomArrayElement(CITY_NAMES);

let totalIntervelCounter = 0;

const createTimeline = () => {
  const randomInterval = getRandomPositiveNumber(TIMELINE_STEP_IN_MINS_MIN, TIMELINE_STEP_IN_MINS_MAX);

  const remainder = dayjs().minute() % 10;
  const now = dayjs().add(-remainder, 'minute');

  const startOfTimeline = now.add(-TIMELINE_START_IN_MINS_AGO, 'minute');
  const lastEventTimeEnd = roundMins(totalIntervelCounter);
  const eventDuration = roundMins(randomInterval);
  const timeIntervalBetweenEvents = roundMins(randomInterval);

  const startOfEvent = startOfTimeline.add(lastEventTimeEnd + timeIntervalBetweenEvents, 'minute');
  const endOfEvent = startOfEvent.add(eventDuration, 'minute');

  totalIntervelCounter += randomInterval * 2;

  return {
    dateFrom: startOfEvent,
    dateTo: endOfEvent,
  };
};

const createPicture = () => {
  return {
    src: `http://picsum.photos/248/152?r=${Math.random()}`,
    description: getRandomArrayElement(DESCRIPTIONS),
  };
};

const createRoute = (index) => {
  if (index <= 7) {
    return START_DESTINATION_NAME;
  }

  if (index <= 14) {
    return MIDDLE_DESTINATION_NAME;
  }

  return END_DESTINATION_NAME;
};

const createDestination = (pictures, index) => {
  return {
    description: getRandomArrayElement(DESCRIPTIONS),
    name: createRoute(index),
    pictures,
  };
};

const createOffer = () => {
  return {
    title: getRandomArrayElement(OFFER_TITLES),
    price: getRandomPrice(MIN_OFFER_PRICE, MAX_OFFER_PRICE),
  };
};


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

export const createPoint = (index) => {
  const pictures = new Array(NUMBER_OF_PICTURES).fill(null).map(() => createPicture());
  const offers = getArrayRandomLength(new Array(NUMBER_OF_OFFERS).fill(null).map(() => createOffer()));

  const basePrice = getRandomPrice(MIN_BASE_PRICE, MAX_BASE_PRICE);
  const destination = createDestination(pictures, index);
  const isFavorite = Boolean(getRandomPositiveNumber(0, 1));
  const type = getRandomArrayElement(TYPES);

  const timeline = createTimeline();
  const {dateFrom, dateTo} = timeline;
  const difference = getDiff(dateFrom, dateTo);

  return {
    basePrice,
    dateFrom,
    dateTo,
    difference,
    destination,
    isFavorite,
    offers,
    type,
  };
};
