const defaultBackgroundImageUrl = "https://images.unsplash.com/photo-1560008511-11c63416e52d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTEwMjl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjI4NDIxMTc&ixlib=rb-1.2.1&q=80&w=1080";
const defaultAuthor = "Dodi Achmad";

async function setBackgroundImage() {
  try {
    // Make the HTTP request and parse the response as JSON
    const res = await fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature");
    const data = await res.json();

    // Set the body's background image to the image returned in the response
    document.body.style.backgroundImage = `url(${data.urls.regular})`;

    // Set the text content of the element with the ID "author" to the name of the user who took the photo
    const authorElement = document.getElementById("author");
    authorElement.textContent = `By: ${data.user.name}`;
  } catch (error) {
    // If there was an error, use the cached default background image/author
    document.body.style.backgroundImage = `url(${defaultBackgroundImageUrl})`;
    document.getElementById("author").textContent =
      `By: ${defaultAuthor}`;
    return error;
  }
}

setBackgroundImage();

// Declare a constant to hold the number of coins to display
const numCoinsToDisplay = 3;

// Define the crypto function to retrieve and display coin data from the CoinGecko API
function crypto() {
  // Call the CoinGecko API to retrieve a list of coins
  fetch("https://api.coingecko.com/api/v3/coins")
    .then((res) => {
      // Check if the API call was successful
      if (!res.ok) {
        throw Error("Something went wrong");
      }
      // Return the response as JSON
      return res.json();
    })
    .then((data) => {
      console.log(data);

      // Get a reference to the crypto container element on the webpage
      const cryptoContainer = document.getElementById("crypto");

      // Loop through the top 3 coins and display their name, price, and market data
      for (let i = 0; i < numCoinsToDisplay; i++) {
        const coin = data[i];

        // Create a div to hold the coin information
        const coinDiv = document.createElement("div");
        coinDiv.classList.add("crypto-container");

        // Use template literals to create the HTML for the coin div
        coinDiv.innerHTML = `
          <div id="coin">
            <img id="coin_img" src="${coin.image.large}"><h3>${coin.name}</h3></img>
            <img src="assets/current_price.png" id="current_price" alt="Current Price">$${coin.market_data.current_price.cad}</img>
            <img src="assets/market_high.png" id="market_high" alt="Market High 24Hr">$${coin.market_data.high_24h.cad}</img>
            <img src="assets/market_low.png" id="market_low" alt="Market Low 24Hr">$${coin.market_data.low_24h.cad}</img>
          </div>
        `;

        // Add the coin div to the crypto container element on the webpage
        cryptoContainer.appendChild(coinDiv);
      }
    })
    .catch((err) => {
      // Catch any errors that occurred during the API call or processing of the data
      console.log(err);
    });
}


function getCurrentTime() {
  // Create a new Date object
  const date = new Date();

  // Get the element with the id "time"
  const timeElement = document.getElementById("time");

  // Set the text content of the time element to the current time in the en-us locale, in short time style
  timeElement.textContent = date.toLocaleTimeString("en-us", { timeStyle: "short" });
}

// Call the getCurrentTime function every 1000 milliseconds (1 second)
setInterval(getCurrentTime, 1000);


const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 5000,
};

async function getWeatherData(lat, lon) {
  // Make a fetch request to the OpenWeatherMap API using the latitude and longitude
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=281e5778a390fb9f47b3a148026caa69&units=metric`
  );

  // If the response is not "ok", throw an error
  if (!response.ok) {
    throw new Error("Something went wrong");
  }
  // If the response is "ok", return the response as JSON
  return response.json();
}

function success(pos) {
  // Destructure the "latitude" and "longitude" properties from the "coords" object in the "pos" object
  const { latitude, longitude } = pos.coords;

  // Get the weather data using the latitude and longitude
  getWeatherData(latitude, longitude)
    .then((data) => {
      console.log(data);

      // Calculate the wind speed in knots and round it to 2 decimal places
      var wind = data.wind.speed / 1.94;
      const windSpeed = Math.round(wind * 100) / 100;

      // Update the HTML content of the element with the id "weather"
      document.getElementById("weather").innerHTML = `
      <img id="weather_icon" src='http://openweathermap.org/img/w/${data.weather[0].icon}.png'></img>
      <div id="temp">${data.main.temp}°C</div>
      <div id="weather_container" onClick="expanded_weather()">
      <div>Current Conditions: ${data.weather[0].description}</div>
      </div>
      <div id="expanded_weather" class="hide">
      <div>Feels Like: ${data.main.feels_like}°C</div>
      <div>Humidity: ${data.main.humidity}%</div>
      <div>Wind Speed: ${windSpeed}Knots</div>
      <div>Wind Direction: ${data.wind.deg}°</div>
      <div>Cloudiness: ${data.clouds.all}%</div>
      <div>Pressure: ${data.main.pressure}hPa</div>
      <div>Visibility: ${data.visibility}m</div>
      <div>Sunrise: ${new Date(data.sys.sunrise * 1000).toLocaleTimeString(
        "en-us",
        { timeStyle: "short" }
      )}</div>
      <div>Sunset: ${new Date(data.sys.sunset * 1000).toLocaleTimeString(
        "en-us",
        { timeStyle: "short" }
      )}</div>
      <div>Location: ${data.name}</div>
      </div>
      `;
    })
    .catch((err) => {
      console.log(err);
    });
}
function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
  document.getElementById("weather").innerHTML = `Hmmmmmm can't seem to find your location, try again later. It will not work on the test server because it is not secure.`;
}
navigator.geolocation.getCurrentPosition(success, error, options);


function expanded_weather() {
  console.log("clicked");
  const expanded_weather = document.getElementById("expanded_weather");
  expanded_weather.classList.toggle("hide")
}
crypto();
