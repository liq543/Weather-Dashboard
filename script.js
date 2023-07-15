var APIKey = 'fcafd102401c66de2b3db010da96e87c';

function getWeather(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${APIKey}`)
      .then(response => response.json())
      .then(data => {
          document.getElementById('currentWeather').innerHTML = `
          <div class="card bg-primary text-white m-2" style="width: 18rem;">
              <div class="card-body">
                  <h5 class="card-title">${data.name} (${new Date().toLocaleDateString()})</h5>
                  <p class="card-text">Temperature: ${data.main.temp} F</p>
                  <p class="card-text">Wind Speed: ${data.wind.speed} MPH</p>
                  <p class="card-text">Humidity: ${data.main.humidity} %</p>
              </div>
          </div>
      `;
      })
      .then(() => {
        fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${APIKey}`)
        .then(response => response.json())
        .then(data => {
            var futureWeatherDiv = document.getElementById('futureWeather');
            futureWeatherDiv.innerHTML = '';
            for (let i = 0; i < data.list.length; i += 8) {
                futureWeatherDiv.innerHTML += `
                  <div class="card bg-primary text-white m-2" style="width: 18rem;">
                    <div class="card-body">
                      <h5 class="card-title">${new Date(data.list[i].dt_txt).toLocaleDateString()}</h5>
                      <p class="card-text">Temperature: ${data.list[i].main.temp} °F</p>
                      <p class="card-text">Wind Speed: ${data.list[i].wind.speed} MPH</p>
                      <p class="card-text">Humidity: ${data.list[i].main.humidity} %</p>
                    </div>
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
