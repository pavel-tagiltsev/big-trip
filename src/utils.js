export const getRandomPositiveNumber = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));

  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

export const limitOffersToShow = (offers) => {
  return offers.length > 3 ? offers.slice(0, 3) : offers;
};

export const chooseRightPreposition = (type) => {
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

export const getDatetimeFormat = (date) => {
  return date.format('YYYY-MM-DDTHH:mm:ssZ');
};

export const humanizeDate = (date) => {
  return date.format('H:mm');
};

export const getRandomArrayElement = (arr) => {
  return arr[getRandomPositiveNumber(0, arr.length - 1)];
};

export const getArrayRandomLength = (arr) => {
  return arr.slice(0, getRandomPositiveNumber(1, arr.length));
};

export const roundMins = (number) => {
  return number - (number % 10);
};

export const getRandomPrice = (min, max) => {
  const price = getRandomPositiveNumber(min, max);
  const remainder = price % 10;

  return price - remainder;
};
