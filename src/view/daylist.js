import { findDays } from '../mock/daylist.js';

const createDays = (points) => {

  const days = findDays(points);
  const { dates, datetimes } = days;

  return dates.map((date, index) => {
    return `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${index + 1}</span>
        <time class="day__date" datetime="${datetimes[index]}">${date}</time>
      </div>

      <ul class="trip-events__list">

      </ul>
    </li>`;
  }).join('');
};

export const createDaylistTemplate = (points) => {
  return `<ul class="trip-days">
     ${createDays(points)}
  </ul>`;
};
