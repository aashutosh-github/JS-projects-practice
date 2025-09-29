const cityInput = document.querySelector("#city-input");
const getWeatherButton = document.querySelector("#get-weather-btn");
const weatherInfo = document.querySelector("#weather-info");
const cityNameDisplay = document.querySelector("#city-name");
const description = document.querySelector("#description");
const temperature = document.querySelector("#temperature");
const errorMessage = document.querySelector("#error-message");

getWeatherButton.addEventListener("click", async () => {
  let city = cityInput.value.trim();
  if (!city) return;

  //it may throw an error so use try catch
  //server may be in another continent so it will take some time
  try {
    const data = await getParamsUsingCity(city);
    const cityData = data.results[0];
    const { latitude, longitude } = cityData;
    const temperatureData = await fetchTemperatureData(latitude, longitude);
    displayWeatherData(city, temperatureData.toFixed(2));
  } catch (error) {
    showError();
  }
});

async function fetchTemperatureData(latitude, longitude) {
  //get the data
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_mean`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    const weatherData = data.daily.temperature_2m_mean;
    return (
      weatherData.reduce((accumulator, current) => {
        return accumulator + current;
      }, 0) / weatherData.length
    );
  } catch (error) {
    showError();
  }
}

function displayWeatherData(city, temp) {
  //display the data
  weatherInfo.classList.remove("hidden");
  cityNameDisplay.innerText = `City: ${city}`;
  temperature.innerHTML = `Temperature: ${temp}&deg;C`;
}

function showError() {
  weatherInfo.classList.add("hidden");
  errorMessage.classList.remove("hidden");
}

async function getParamsUsingCity(city) {
  //get latitude and longitude from the city name
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`;
  const response = await fetch(url);
  if (!response.ok) showError();
  const dataOfCity = await response.json();
  return dataOfCity;
}
