import { Notify } from 'notiflix/build/notiflix-notify-aio';
// іменований імпорт функції
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import './css/styles.css';

const DEBOUNCE_DELAY = 300;

let inputValue = '';

const refs = {
  inputRef: document.querySelector('#search-box'),
  listRef: document.querySelector('.country-list'),
  countryInfoRef: document.querySelector('.country-info'),
};
refs.inputRef.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(e) {
  e.preventDefault();
  inputValue = e.target.value.trim('');
  // if (inputValue === '') {
  // }
}
