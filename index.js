// Get the nature Img from the API and set it as the background
fetch(
  "https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature"
)
  .then((res) => {
    if (!res.ok) {
      throw Error("Something went wrong");
    }
    return res.json();
  })
  .then((data) => {
    console.log(data);
    document.body.style.backgroundImage = `url(${data.urls.regular})`;
    document.getElementById("author").textContent = `By: ${data.user.name}`;
  })
  .catch((error) => {
    // Use a default background image/author
    document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1560008511-11c63416e52d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTEwMjl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjI4NDIxMTc&ixlib=rb-1.2.1&q=80&w=1080)`;
    document.getElementById("author").textContent = `By: Dodi Achmad`;
    return error;
  });
var hover = [3];
function crypto() {
  fetch("https://api.coingecko.com/api/v3/coins")
    .then((res) => {
      if (!res.ok) {
        throw Error("Something went wrong");
      }
      return res.json();
    })
    .then((data) => {
      console.log(data)
      // loop through the data and display 3 top coins in a respective crypto-top div, with the name, price, market high, and market low
      for (let i = 0; i < [hover]; i++) {
        const coin = data[i];
        const coinDiv = document.createElement("div");
        coinDiv.classList.add("crypto-container");
        coinDiv.innerHTML = `
                <div id="coin">
                  <img id="coin_img" src="${coin.image.large}"><h3>${coin.name}</h3></img>
                  <img src="assets/current_price.png" id="current_price" alt="Current Price">$${coin.market_data.current_price.cad}</img>
                  <img src="assets/market_high.png" id="market_high" alt="Market High 24Hr">$${coin.market_data.high_24h.cad}</img>
                  <img src="assets/market_low.png" id="market_low" alt="Market Low 24Hr">$${coin.market_data.low_24h.cad}</img>
                </div>
            `;
        document.getElementById("crypto").appendChild(coinDiv);
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

//
function getCurrentTime() {
  const date = new Date();
  document.getElementById("time").textContent = date.toLocaleTimeString(
    "en-us",
    { timeStyle: "short" }
  );
}
setInterval(getCurrentTime, 1000);

const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 5000,
};
function success(pos) {
  const crd = pos.coords;
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&appid=281e5778a390fb9f47b3a148026caa69&units=metric `
  )
    .then((res) => {
      if (!res.ok) {
        throw Error("Something went wrong");
      }
      return res.json();
    })
    .then((data) => {
      console.log(data);
      // round the wind speed to 2 decimal places
      var wind = data.wind.speed / 1.94;
      const windSpeed = Math.round(wind * 100) / 100;
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
}
navigator.geolocation.getCurrentPosition(success, error, options);
6;
function expanded_weather() {
  console.log("clicked");
  const expanded_weather = document.getElementById("expanded_weather");
  expanded_weather.classList.toggle("hide")
}
crypto();
