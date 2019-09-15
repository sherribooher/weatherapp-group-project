var weatherCard = [];
var city;
// render function

document.addEventListener("DOMContentLoaded", function(e) {
  window.onload = function() {
    if (!window.location.hash) {
      window.location = window.location + "#loaded";
      window.location.reload();
    }
  };

  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth();
  var firstCard = document.querySelector(".weather-card");
  var startCity = document.querySelector(".cityname").textContent;
  var startCityStyle = document.querySelector(".cityname");

  axios
    .get(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        startCity +
        "&units=imperial&appid=8e9a4b4545a680355a95d6c810a6f708"
    )
    .then(function(response) {
      var locationuno = response.data;
      var firstCardMain = document.querySelector(".weather-main");
      var firstCardTemp = document.querySelector(".temperature");
      var firstCardDate = document.querySelector(".today-date");
      var firstCardMin = document.querySelector(".today-min");
      var firstCardMax = document.querySelector(".today-max");
      var firstCardHum = document.querySelector(".today-hum");

      startCityStyle.style.backgroundImage =
        "url('/styles/img/" + locationuno.weather[0].main + ".jpg')";

      firstCardMain.innerHTML = `
      <h4 class="weather-main">${locationuno.weather[0].main}</h4>`;
      firstCardTemp.innerHTML = `
      <p class="temperature"> ${locationuno.main.temp}&degF</p>`;
      firstCardDate.innerHTML = `
      <p class="today-date">${locationuno.weather[0].description}</p>`;
      firstCardMin.innerHTML = `
      <p class="today-min">Min Temp: ${locationuno.main.temp_min}&degF</p>`;
      firstCardMax.innerHTML = `
      <p class="today-max">Max Temp: ${locationuno.main.temp_max}&degF</p>`;
      firstCardHum.innerHTML = `
      <p class="today-hum">Humidity: ${locationuno.main.humidity}%</p>`;
    });

  function renderWeather(location) {
    var type = location.weather[0].main;

    return `
            <h3 class="cityname">${location.name}</h3>
            <h4 class="weather-main">${location.weather[0].main}</h4>
   
             <p class="temperature"> ${location.main.temp}&degF</p>
             <p class="today-date">${location.weather[0].description}</p>
             <p class="today-hum">Humidity: ${location.main.humidity}%</p>
             <p class="today-min">Min Temp: ${location.main.temp_min}&degF</p>
             <p class="today-max">Max Temp: ${location.main.temp_max}&degF</p>
             <div class="button-container">
             <button class="see-more">See More</button>
             <button class="removal">Removal</button>
             </div>
           `;
  }

  document.addEventListener("submit", function(e) {
    e.preventDefault();
    var searchbar = document.querySelector(".search-bar").value;
    city = searchbar.substr(0, searchbar.indexOf(","));

    axios
      .get(
        "https://api.openweathermap.org/data/2.5/weather?q=" +
          city +
          "&units=imperial&appid=8e9a4b4545a680355a95d6c810a6f708"
      )
      .then(function(response) {
        var type = response.data.weather[0].main;

        var fiveCard = document.querySelectorAll(".weather-card").length;

        if (fiveCard <= 4) {
          var container = document.querySelector(".weather-cards");
          let newWeather = document.createElement("div");
          newWeather.className = "weather-card";
          newWeather.innerHTML = renderWeather(response.data);
          newWeather;
          container.appendChild(newWeather);
          return response;
        }
      })
      .then(function(response) {
        let c = document.getElementsByClassName("cityname");
        let lastElem = c[c.length - 1];
        lastElem.style.backgroundImage =
          "url('/styles/img/" + response.data.weather[0].main + ".jpg')";
      });
  });
});
