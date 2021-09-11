import { createTripInfoTemplate } from './view/trip-info';
import { createMenuTemplate } from './view/menu';
import { createFilterTemplate } from './view/filter';
import { createSortTemplate } from './view/sort';
import { createDaylistTemplate } from './view/daylist';
import { createEventTemplate } from './view/event';
import { createEventEditTemplate } from './view/event-edit';
import { createPoint } from './mock/event';

const NUMBER_OF_POINTS = 20;

const points = new Array(NUMBER_OF_POINTS).fill(null).map((item, index) => createPoint(index));

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const tripMainElement = document.querySelector('.trip-main');
const controlElement = document.querySelector('.trip-controls');
const menuTitleElement = controlElement.firstElementChild;
const eventElement = document.querySelector('.trip-events');

render(tripMainElement, createTripInfoTemplate(points), 'afterbegin');
render(menuTitleElement, createMenuTemplate(), 'afterend');
render(controlElement, createFilterTemplate(), 'beforeend');
render(eventElement, createSortTemplate(), 'beforeend');

render(eventElement, createDaylistTemplate(points), 'beforeend');

const enentListElement = document.querySelector('.trip-events__list');

render(enentListElement, createEventEditTemplate(points[0]), 'beforeend');

for (let i = 1; i < points.length; i++) {
  const { dateFrom } = points[i];
  const datetime = document.querySelector(`time[datetime="${dateFrom.format('YYYY-MM-DD')}"]`);
  const day = datetime.parentElement.parentElement.querySelector('.trip-events__list');

  render(day, createEventTemplate(points[i]), 'beforeend');
}


