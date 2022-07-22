export default async function fetchWeather(location) {
  try {
    const response = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=19e66a9ddfc542c593a130311222007&q=${location}`
    ).then((response) => response.json());

    let timeOfDay = 'day';
    if (!response.current.is_day) timeOfDay = 'night';
    const code = response.current.condition.code;

    return {
      current: response.current,
      location: response.location,
      timeBasedImages: {
        code: code,
        time: timeOfDay,
        skyType: {
          clear: {
            bgImageURL: 'clear.jpg',
            timeOfDay: {
              day: {
                bgColor: '#e5ba92',
              },
              night: {
                bgColor: '#181e27',
              },
            },
          },
          cloudy: {
            bgImageURL: 'cloudy.jpg',
            timeOfDay: {
              day: {
                bgColor: '#fa6d1b',
              },
              night: {
                bgColor: '#181e27',
              },
            },
          },
          rainy: {
            bgImageURL: 'rainy.jpg',
            timeOfDay: {
              day: {
                bgColor: '#647d75',
              },
              night: {
                bgColor: '#325c80',
              },
            },
          },
          snowy: {
            bgImageURL: 'snowy.jpg',
            timeOfDay: {
              day: {
                bgColor: '#4d72aa',
              },
              night: {
                bgColor: '#1b1b1b',
              },
            },
          },
        },
      },
    };
  } catch (e) {
    alert('City not found, please try again');
  }
}
