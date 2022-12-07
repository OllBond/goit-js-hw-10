import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';
// іменований імпорт функції
import { fetchCountries } from './fetchCountries';
import './css/styles.css';

const DEBOUNCE_DELAY = 300;
// глобальна змінна, яка доступна в різних функціях
// let inputValue = '';

const refs = {
  inputRef: document.querySelector('#search-box'),
  listRef: document.querySelector('.country-list'),
  countryInfoRef: document.querySelector('.country-info'),
};
refs.inputRef.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(e) {
  // дані з інпута
  const inputValue = e.target.value.trim();
  // якщо пустий рядок false за допомогою інверсії змінюємо на true
  // тобто якщо пустий рядок - вийшли з функції
  if (!inputValue) {
    return;
  }
  // якщо не пустий рядок викликаємо функцію fetchСountries
  // передаємо значення яке ввів користувач inputValue
  fetchCountries(inputValue)
    // отримали дані response, прописуємо логіку, що робити з цими даними
    // т.ч. можемо перевикористовувати функцію
    .then(res => {
      console.log(res);
      const resLength = res.length;
      // якщо один об'єкт відмальовуємо картку однієї країни
      if (resLength === 1) {
        createOneCountryMarkup(res);
        return;
      }
      // якщо 2 об'єкти або або 10 або менше 10 - малюємо список країн
      if (resLength > 2 && resLength <= 10) {
      }
      // якщо більше 10 об'єктів(країн) виводити рядок
      if (resLength < 10) {
        // Notify.info(
        //   'Too many matches found. Please enter a more specific name.'
        // );
      }
    })
    .catch(error => {
      console.log(error);
    });
}

function createOneCountryMarkup(countries) {
  const markup = countries
    .map(country => {
      `
      <div class="country-info">
      <img class="country-info-flag" src="${country.flags.svg}"
     alt="flag">
     <h1 class="country-info-name">${country.name.official}</h1>
     </div>
     <ul class="country-list">
     <li>
     <p class="country-info-item">Capital: </p>
     <span class="country-info-value">${country.capital}</span>
     </li>
     <li>
     <p class="country-info-item">Population: </p>
     <span class="country-info-value">${country.population}</span>
     </li>
     <li>
     <p class="country-info-item">Languages: </p>
     <span class="country-info-value">${country.languages}</span>
     </li>
     </ul>`;
      // console.log(markup);
    })
    .join('');

  refs.countryInfoRef.insertAdjacentHTML('beforeend', markup);
}

function clearMarkup() {
  refs.listRef.innerHTML = '';
  refs.countryInfoRef.innerHTML = '';
}
