const createDays = (points) => {
  const set = new Set();

  points.forEach((point) => {
    const {
      date_from: dateFrom,
    } = point;

    set.add(dateFrom.format('MMM D'));
  });

  const arr = [];

  set.forEach((item) => {
    arr.push(item);
  });

  return arr.map((item, index) => {
    return `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${index + 1}</span>
        <time class="day__date" datetime="${item}">${item}</time>
      </div>

      <ul class="trip-events__list">

      </ul>
    </li>`;
  }).join('');

};

export const createEventListTemplate = (points) => {
  return `<ul class="trip-days">
     ${createDays(points)}
  </ul>`;
};
