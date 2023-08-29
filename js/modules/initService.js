import { API_URL } from './const.js';
import { addPreload, removePreload } from './util.js';

const renderPrice = (wrapper, data) => {
  data.forEach((item) => {
    const priceItem = document.createElement('li');
    priceItem.classList.add('price__item');
    priceItem.innerHTML = `
      <span class="price__item-title">${item.name}</span>
      <span class="price__item-count">${item.price} руб</span>
    `;

    wrapper.append(priceItem);
  });
};

const renderService = (wrapper, data) => {
  const labels = data.map((item) => {
    const label = document.createElement('label');
    label.classList.add('radio');
    label.innerHTML = `
      <input class="radio__input" type="radio" name="service" value="${item.id}"/>
      <span class="radio__label">${item.name}</span>
    `;

    return label;
  });

  wrapper.append(...labels);
};

export const initService = () => {
  const priceList = document.querySelector('.price__list');
  const reserveFieldsetService = document.querySelector('.reserve__fieldset_service');

  priceList.textContent = '';
  addPreload(priceList);

  reserveFieldsetService.innerHTML = '<legend class="reserve__legend">Услуга</legend>';
  addPreload(reserveFieldsetService);

  fetch(`${API_URL}/api`)
    .then((res) => res.json())
    .then((data) => {
      renderPrice(priceList, data);
      removePreload(priceList);
      return data;
    })
    .then((data) => {
      renderService(reserveFieldsetService, data);
      removePreload(reserveFieldsetService);
    });
};
