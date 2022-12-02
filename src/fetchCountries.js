// іменований експорт функції
export function fetchCountries(name) {
  return fetch(
    'https://restcountries.com/v3.1/name/${name}?fields=name.official,capital,population,flags.svg,languages'
  )
    .then(response => response.json())
    .then(data => console.log(date))
    .catch(error => {
      console.log(error);
    });
}
