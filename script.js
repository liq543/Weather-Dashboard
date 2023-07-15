var APIKey = 'fcafd102401c66de2b3db010da96e87c';

function getWeather(city) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${APIKey}`)
    .then(response => response.json())
    .then(data => {
      document.getElementById('currentWeather').innerHTML = `
        <h2>${data.name} (${new Date().toLocaleDateString()})</h2>
        <p>Temperature: ${data.main.temp} °F</p>
        <p>Wind Speed: ${data.wind.speed} MPH</p>
        <p>Humidity: ${data.main.humidity} %</p>
      `;

      fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${APIKey}`)
        .then(response => response.json())
        .then(data => {
          var futureWeatherDiv = document.getElementById('futureWeather');
          futureWeatherDiv.innerHTML = '<h2>5-Day Forecast:</h2>';
          for (let i = 0; i < data.list.length; i += 8) {
            futureWeatherDiv.innerHTML += `
              <div>
                <h3>${new Date(data.list[i].dt_txt).toLocaleDateString()}</h3>
                <p>Temperature: ${data.list[i].main.temp} °F</p>
                <p>Wind Speed: ${data.list[i].wind.speed} MPH</p>
                <p>Humidity: ${data.list[i].main.humidity} %</p>
              </div>
            `;
          }
        });
    });
}

function handleCityButtonClick(event) {
  getWeather(event.target.textContent);
}

var cityButtons = document.getElementsByClassName('cityButton');
for (var i = 0; i < cityButtons.length; i++) {
  cityButtons[i].addEventListener('click', handleCityButtonClick);
}

document.getElementById('searchButton').addEventListener('click', function(event) {
  event.preventDefault();
  var city = document.getElementById('city').value;
  if (city) {
    getWeather(city);
  }
});
