const apiKey = `cbe59f16053dc1f21caa8185a30e5799`;

const locationUrl = `http://api.openweathermap.org/geo/1.0/direct?`;
//  q=${city}&limit=5&appid=${apiKey}`;

var lat, lon;

//  const weatherUrl= `https://api.openweathermap.org/data/2.5/weather?lat=`;
// //  ${lat}&lon=${lon}&appid=${apiKey}`;

var searchBar = document.querySelector(".search-bar input");
var searchIcon = document.querySelector(".search-bar img");

searchIcon.addEventListener("click", function () {
  checkWeather(searchBar.value);
});

searchBar.addEventListener("keydown", (event) => {
  if (event.key == "Enter") checkWeather(searchBar.value);
});

async function checkWeather(city) {
  var response = await fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`
  );
  var data = await response.json();

  console.log(data);

  if (data.length == 0) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather-img").style.display = "none";
    document.querySelector(".temperature").style.display = "none";
    document.querySelector(".city").style.display = "none";
    document.querySelector(".details").style.display = "none";
    document.querySelector(".content").style.minHeight = "100px";
  } else {
    document.querySelector(".error").style.display = "none";
    document.querySelector(".weather-img").style.display = "block";
    document.querySelector(".temperature").style.display = "block";
    document.querySelector(".city").style.display = "block";
    document.querySelector(".details").style.display = "flex";
    document.querySelector(".content").style.minHeight = "600px";
    var lon = data[0].lon;
    var lat = data[0].lat;

    response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
    );
    data = await response.json();
    // console.log(data);

    manipulateDOM(data);
  }
}

function manipulateDOM(data) {
  document.querySelector(".city").textContent = data.name;
  document.querySelector(".temperature p").textContent =
    Math.round(data.main.temp) + " °C";
  document.querySelector(".api-humidity h3").textContent =
    Math.round(data.main.humidity) + "%";
  document.querySelector(".api-wind-speed h3").textContent =
    data.wind.speed + " km/h";

  console.log(data.weather[0].main);

  var tmp;
  if (data.weather[0].main == "Clear") tmp = "./images/clear.png";
  else if (data.weather[0].main == "Smoke") tmp = "./images/mist.png";
  else if (data.weather[0].main == "Clouds") tmp = "./images/clouds.png";
  else if (data.weather[0].main == "Rain") tmp = "./images/rain.png";
  else if (data.weather[0].main == "Snow") tmp = "./images/snow.png";
  else if (data.weather[0].main == "Drizzle") tmp = "./images/drizzle.png";
  else if (data.weather[0].main == "Haze") tmp = "./images/drizzle.png";
  
  document.querySelector(".weather-img img").src = tmp;
}
