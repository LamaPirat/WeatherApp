let form = document.querySelector("form");

form.addEventListener("submit", async function (event) {
  try {
    event.preventDefault();
    let inputValue = document.querySelector("#city").value;
    let castData = await getData(inputValue);
    renderForecast(castData);
  } catch (error) {
    console.log(error);
  }
});

function renderForecast(forecast) {
  const cityName = document.getElementById("city-name");
  const skyDescription = document.getElementById("sky-description");
  const temperature = document.getElementById("temperature");
  const humidity = document.getElementById("humidity");
  const wind = document.getElementById("wind");

  cityName.textContent = forecast.name;
  skyDescription.textContent = forecast.description;
  temperature.textContent = "Temperature: " + forecast.temp + "℃";
  humidity.textContent = "Humidity: " + forecast.humidity;
  wind.textContent = "Wind: " + forecast.wind;

  console.log(forecast);
}

const forecastAPIKEY = "faac10a06b1a2a36ab0dcba41c578a9d";

async function getCoordinates(city) {
  try {
    const response =
      await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=faac10a06b1a2a36ab0dcba41c578a9d
        `);
    const coordData = await response.json();
    return [coordData[0].lat, coordData[0].lon];
  } catch (error) {
    console.log(error);
  }
}

async function getForeCast(lat, lon) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${forecastAPIKEY}`
    );
    //Celsius (°C) = (Fahrenheit - 32) / 1.8
    const castData = await response.json();
    let weatherData = {
      name: castData.name,
      description: castData.weather[0].description,
      temp: (castData.main.temp - 273.15).toFixed(1),
      humidity: castData.main.humidity,
      wind: castData.wind.speed,
    };
    return weatherData;
  } catch (error) {
    console.log(error);
  }
}

async function getData(city) {
  try {
    let coordinates = await getCoordinates(city);
    let forecastData = await getForeCast(coordinates[0], coordinates[1]);
    return forecastData;
  } catch (error) {
    console.log(error);
  }
}

getData("oslo");
