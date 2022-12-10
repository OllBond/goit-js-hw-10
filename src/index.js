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
  // очищаємо розмітку
  clearInput();
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
        const markup = createOneCountryMarkup(res);
        refs.countryInfoRef.insertAdjacentHTML('beforeend', markup);
        return;
      }
      // якщо 2 об'єкти або або 10 або менше 10 - малюємо список країн
      if (resLength > 2 && resLength <= 10) {
        const markup = createCountriesList(res);
        refs.listRef.insertAdjacentHTML('beforeend', markup);
        return;
      }
      // якщо більше 10 об'єктів(країн) виводити рядок
      if (resLength > 10) {
        Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
        return;
      }
    })
    .catch(error => {
      clearInput();
      console.log(error);
      Notify.failure('Oops, there is no country with that name');
    });
}
// дефолтне значення вказуємо пустий масив, щоб не було помилки
function createOneCountryMarkup(countries = []) {
  return countries
    .map(
      country =>
        `
        <div class="country-info-wrapper">
      <img class="country-info-flag" src="${country.flags.svg}"
     alt="flag" width='30' hight='20'>
     <h1 class="country-info-name">${country.name.official}</h1>
     </div>
     <ul class="country-list-info">
     <li class="country-list-item">
     <p class="country-list-signs">Capital: </p>
     <span class="country-list-span">${country.capital}</span>
     </li>
     <li class="country-list-item">
     <p class="country-list-signs">Population: </p>
     <span class="country-list-span">${country.population}</span>
     </li>
     <li class="country-list-item">
     <p class="country-list-signs">Languages: </p>
     <span class="country-list-span">${Object.values(country.languages).join(
       ', '
     )}</span>
     </li>
     </ul>`
    )
    .join('');
}

function createCountriesList(countries = []) {
  return countries
    .map(
      country => `<li class="country-list-item">
  <img class="country-flag" src="${country.flags.svg}" alt="flag" width='30' hight='20'>
  <p class="country-name">${country.name.official}</p>
  </li>`
    )
    .join('');
}

// функція очистки інпуту
function clearInput() {
  refs.listRef.innerHTML = '';
  refs.countryInfoRef.innerHTML = '';
}
