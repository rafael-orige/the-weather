import fetchWeather from './src/services/fetchWeather.js';
import dayOfTheWeek from './src/utils/dayOfTheWeek.js';
import returnCondition from './src/utils/returnCondition.js';
import render from './src/utils/render.js';
import debounce from './src/utils/debounce.js';

const app = document.querySelector('.weather-app');
const temp = document.querySelector('.temp');
const dateOutput = document.querySelector('.date');
const timeOutput = document.querySelector('.time');
const conditionOutput = document.querySelector('.condition');
const nameOutput = document.querySelector('.name');
const icon = document.querySelector('.icon');
const cloudOutput = document.querySelector('.cloud');
const humidityOutput = document.querySelector('.humidity');
const windOutput = document.querySelector('.wind');
const form = document.getElementById('locationInput');
const search = document.querySelector('.search');
const btn = document.querySelector('.submit');
const cities = document.querySelectorAll('.city');

let cityInput = 'Porto Alegre';

async function setData() {
  app.style.opacity = '0';

  const loc = cityInput;
  const data = await fetchWeather(loc);

  // Main temperature information
  render(temp, data.current.temp_c + '&#176;');
  render(conditionOutput, data.current.condition.text);

  // Date
  const date = data.location.localtime;
  const y = parseInt(date.substr(0, 4));
  const m = parseInt(date.substr(5, 2));
  const d = parseInt(date.substr(8, 2));
  const time = date.substr(11);

  render(dateOutput, `${dayOfTheWeek(d, m, y)}, ${d}, ${m} ${y}`);
  render(timeOutput, time);
  render(nameOutput, data.location.name);

  // Panel Output
  render(cloudOutput, data.current.cloud + '%');
  render(humidityOutput, data.current.humidity + '%');
  render(windOutput, data.current.wind_kph + 'km/h');

  // Icon
  const iconId = data.current.condition.icon.substr(
    '//cdn.weatherapi.com/weather/64x64'.length
  );
  icon.src = './src/assets/icons' + iconId;

  // Background and Button
  const timeOfDay = data.timeBasedImages.time;
  const code = data.timeBasedImages.code;
  const condition = returnCondition(code);
  const conditionImage = data.timeBasedImages.skyType[condition].bgImageURL;
  const buttonColor =
    data.timeBasedImages.skyType[condition].timeOfDay[timeOfDay].bgColor;

  app.style.backgroundImage = `url(./src/assets/images/${timeOfDay}/${conditionImage})`;
  btn.style.background = buttonColor;

  app.style.opacity = '1';
}

// Add search on click to famous cities
cities.forEach((city) => {
  city.addEventListener('click', (e) => {
    cityInput = e.target.innerHTML;
    setData();
  });
});

// Add debounce to search input
search.addEventListener(
  'keyup',
  debounce(() => {
    if (search.value.length === 0) return;

    cityInput = search.value;
    setData();
  })
);

// Start search on submiting
form.addEventListener('submit', (e) => {
  if (search.value.length == 0) {
    alert('Please type in a city name');
  } else {
    cityInput = search.value;

    setData(cityInput);

    search.value = '';
  }

  e.preventDefault();
});

setData();
