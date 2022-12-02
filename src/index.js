import { Notify } from 'notiflix/build/notiflix-notify-aio';
// іменований імпорт функції
import { fetchCountries } from './fetchCountries';
import './css/styles.css';

const DEBOUNCE_DELAY = 300;

const refs = {
  inputRef: document.querySelector('#search-box'),
  listRef: document.querySelector('.country-list'),
  countryInfoRef: document.querySelector('.country-info'),
};
