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
  temp.innerHTML = data.current.temp_c + '&#176;';
  conditionOutput.innerHTML = data.current.condition.text;

  // Date


  const date = data.location.localtime;
  const y = parseInt(date.substr(0, 4));
  const m = parseInt(date.substr(5, 2));
  const d = parseInt(date.substr(8, 2));
  const time = date.substr(11);

  dateOutput.innerHTML = `${dayOfTheWeek(d, m, y)}, ${d}, ${m} ${y}`;
  timeOutput.innerHTML = time;
  nameOutput.innerHTML = data.location.name

  // Panel Output
  cloudOutput.innerHTML = data.current.cloud + '%';
  humidityOutput.innerHTML = data.current.humidity + '%';
  windOutput.innerHTML = data.current.wind_kph + 'km/h';

  // Icon
  const iconId = data.current.condition.icon.substr('//cdn.weatherapi.com/weather/64x64'.length);
  icon.src = './src/assets/icons' + iconId;

  // Background and Button
  function returnCondition(code) {
    if(code === 1000) return 'clear';

    const conditionCodes = [
      { title: 'cloudy', codes: [1003, 1006, 1009, 1030, 1069, 1087, 1135, 1273, 1276, 1279, 1282] },
      { title: 'rainy', codes: [1063, 1069, 1072, 1150, 1153, 1180, 1183, 1186, 1189, 1192, 1195, 1204, 1207, 1240, 1243, 1246, 1249, 1252] }
    ];

    let result;

    conditionCodes.forEach(condition => {
      const checkCondition = (item) => {
        if(item === code) result = condition.title;
      };

      condition.codes.forEach(item => checkCondition(item));
    });

    return result;
  };
  const timeOfDay = data.timeBasedImages.time;
  const code = data.timeBasedImages.code;
  const condition = returnCondition(code);
  const conditionImage = data.timeBasedImages.skyType[condition].bgImageURL;
  const buttonColor = data.timeBasedImages.skyType[condition].timeOfDay[timeOfDay].bgColor;

  app.style.backgroundImage = `url(./src/assets/images/${timeOfDay}/${conditionImage})`;
  btn.style.background = buttonColor;

  
  app.style.opacity = '1';
}

cities.forEach(city => {
  city.addEventListener('click', (e) => {
    cityInput = e.target.innerHTML;
    setData();
  })
});

function debounce(time = 1000) {
  let timer;

  return () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      if(search.value.length === 0) return

      cityInput = search.value;
      setData();
    }, time);
  }
}

search.addEventListener('keyup', debounce());

form.addEventListener('submit', (e) => {
  if(search.value.length == 0) {
    alert('Please type in a city name');
  } else {
    cityInput = search.value;

    setData(cityInput);

    search.value = '';
  }

  e.preventDefault();
});

setData();
