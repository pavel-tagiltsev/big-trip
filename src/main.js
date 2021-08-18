import { createTripInfoTemplate } from './view/trip-info';
import { createMenuTemplate } from './view/menu';
import { createFilterTemplate } from './view/filter';
import { createSortTemplate } from './view/sort';
import { createEventListTemplate } from './view/event-list';
import { createEventTemplate } from './view/event';
import { createEventEditTemplate } from './view/event-edit';

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
render(enentListElement, createEventTemplate(), 'beforeend');
render(enentListElement, createEventTemplate(), 'beforeend');
render(enentListElement, createEventTemplate(), 'beforeend');
