// Replace 'your_api_key' with your actual API key from OpenWeatherMap
var APIKey = '9d2557e2d99b2aa1f1c3bf11655c32e6';

// List of predefined city buttons
var cityButtons = ['Atlanta', 'Denver', 'Seattle', 'San Francisco', 'Orlando', 'New York', 'Chicago', 'Austin'];

// Function to fetch and display weather data
function getWeather(city) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${APIKey}`)
    .then(response => response.json())
    .then(data => {
      // Display current weather
      document.getElementById('currentWeather').innerHTML = `
        <h2>${data.name} (${new Date().toLocaleDateString()})</h2>
        <p>Temperature: ${data.main.temp} °F</p>
        <p>Wind Speed: ${data.wind.speed} MPH</p>
        <p>Humidity: ${data.main.humidity} %</p>
      `;

      // Get future weather
      fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${APIKey}`)
        .then(response => response.json())
        .then(data => {
          // Display future weather
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

// Function to handle city button click
function handleCityButtonClick(event) {
  getWeather(event.target.textContent);
}

// Add event listeners to city buttons
for (let i = 1; i <= cityButtons.length; i++) {
  document.getElementById(`city${i}`).addEventListener('click', handleCityButtonClick);
}

// Add event listener to search button
document.getElementById('searchButton').addEventListener('click', function(event) {
  event.preventDefault();
  var city = document.getElementById('city').value;
  if (city) {
    getWeather(city);
  }
});
