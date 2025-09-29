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
    const weatherData = await fetchWeatherData(city);
    displayWeatherData(weatherData);
  } catch (error) {
    showError(error);
  }
});

async function fetchWeatherData(city) {
  //get the data
}

function displayWeatherData(weatherData) {
  //display the data
}

function showError() {
  weatherInfo.classList.add("hidden");
  errorMessage.classList.remove("hidden");
}
