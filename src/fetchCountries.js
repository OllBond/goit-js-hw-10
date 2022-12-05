// import axios from 'axios';

const BASE_URL = 'https://restcountries.com/v3.1/name/';
// іменований експорт функції
export function fetchCountries(name) {
  return fetch(
    `${BASE_URL}${name}?fields=name.official,capital,population,flags.svg,languages`
  ).then(response => {
    console.log(response);
    // якщо response.ok true
    if (response.ok) {
      // повкртаємо розпарсений об'єкт
      return response.json();
    }
    throw new Error(response.statusText);
  });

  // axios
  // return axios
  //   .get(
  //     `https://restcountries.com/v3.1/name/${name}?fields=name.official,capital,population,flags.svg,languages`
  //   )
  //   .then(({ data }) => data);
}

// // іди принеси список всіх країн
// const r = fetch('https://restcountries.com/v3.1/all')
//   .then(response => {
//     //  коли принесеш спробуй розпарсити,
//     // результат вертаю у наступний then
//     return response.json();
//   })
//   // тут те що повернув return якщо все добре вертається масив
//   .then(all => {
//     console.log(all);
//   })
//   // якщо не добре виконуй помилку
//   .catch(error => {
//     console.log(error);
//   });
