import { createTripInfoTemplate } from './view/trip-info';
import { createMenuTemplate } from './view/menu';
import { createFilterTemplate } from './view/filter';
import { createSortTemplate } from './view/sort';
import { createEventListTemplate } from './view/event-list';
import { createEventTemplate } from './view/event';
import { createEventEditTemplate } from './view/event-edit';
import dayjs from 'dayjs';

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
const NUMBER_OF_POINTS = 20;

const getRandomPositiveNumber = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));

  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (arr) => {
  return arr[getRandomPositiveNumber(0, arr.length - 1)];
};

const getRandomPrice = (min, max) => {
  const price = getRandomPositiveNumber(min, max);
  const remain = price % 10;

  return price - remain;
};


let countMins = 0;

const getRandomDate = () => {

  const randomMins = getRandomPositiveNumber(0, 2880);

  const randomFromDate = dayjs().add(countMins, 'minute');
  const randomToDate = randomFromDate.add(randomMins, 'minute');


  countMins += randomMins;

  return {
    randomFromDate,
    randomToDate,
  };
};

const getArrayRandomLength = (arr) => {
  return arr.slice(0, getRandomPositiveNumber(1, arr.length));
};

const createPoint = () => {

  const createPicture = () => {
    return {
      src: `http://picsum.photos/248/152?r=${Math.random()}`,
      description: getRandomArrayElement(DESCRIPTIONS),
    };
  };

  const createPictures = () => new Array(NUMBER_OF_PICTURES).fill(null).map(() => createPicture());

  const createDestination = () => {
    return {
      description: getRandomArrayElement(DESCRIPTIONS),
      name: getRandomArrayElement(CITY_NAMES),
      pictures: createPictures(),
    };
  };

  const createOffer = () => {
    return {
      title: getRandomArrayElement(OFFER_TITLES),
      price: getRandomPrice(MIN_OFFER_PRICE, MAX_OFFER_PRICE),
    };
  };

  const createOffers = () => new Array(NUMBER_OF_OFFERS).fill(null).map(() => createOffer());

  const randomDate = getRandomDate();

  const point = {
    base_price: getRandomPrice(MIN_BASE_PRICE, MAX_BASE_PRICE),
    date_from: randomDate.randomFromDate,
    date_to: randomDate.randomToDate,
    destination: createDestination(),
    id: '0',
    is_favorite: Boolean(getRandomPositiveNumber(0, 1)),
    offers: getArrayRandomLength(createOffers()),
    type: getRandomArrayElement(TYPES),
  };

  return point;
};

const createPoints = () => new Array(NUMBER_OF_POINTS).fill(null).map(() => createPoint());

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const tripMainElement = document.querySelector('.trip-main');
const controlElement = document.querySelector('.trip-controls');
const menuTitleElement = controlElement.firstElementChild;
const eventElement = document.querySelector('.trip-events');

render(tripMainElement, createTripInfoTemplate(), 'afterbegin');
render(menuTitleElement, createMenuTemplate(), 'afterend');
render(controlElement, createFilterTemplate(), 'beforeend');
render(eventElement, createSortTemplate(), 'beforeend');
render(eventElement, createEventListTemplate(), 'beforeend');

const enentListElement = document.querySelector('.trip-events__list');

render(enentListElement, createEventEditTemplate(), 'beforeend');

const points = createPoints();

points.forEach((point) => {
  render(enentListElement, createEventTemplate(point), 'beforeend');
});

