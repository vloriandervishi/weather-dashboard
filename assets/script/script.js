


$(document).ready(function () {
  $("button").on('click', function () {
    var input = document.querySelector('#sx').value;
    var apiUrlKey = `http://api.openweathermap.org/data/2.5/forecast?q=${input}&appid=768d6bd4bf42c06b0464c112e838748f`
    // Converts the response to JSON
    async function getWeatherInfo() {
      let response = await fetch(apiUrlKey);
      let data = await response.json();
      return data;
    }
    getWeatherInfo().then(data => {
      console.log(data.list[0].wind);
      // Search city name
      var iconList = data.list[0].weather[0].icon;
      var weatherIcon = $('<img id="weatherIcon">');
      weatherIcon.attr('src', `http://openweathermap.org/img/wn/${iconList}@2x.png`);
      $(".name").append('Temperature: '+ data.city.name);
      
      $(".temp").append(Math.floor(data.list[0].main.temp - 273.15) * 1.80 + 32 + '℉ ');
      $(".humidity").prepend('Humidity: ')
      $(".humidity").append(data.list[0].main.humidity + '%');

      $(".wind").append(data.list[0].wind.speed + ' mph');

      $(".uv-index").append();
      weatherIcon.appendTo('.name');    

    });
    function clearField() {
      $(".name").empty();
      $(".humidity").empty();
      $(".wind").empty();
      $(".uv-index").empty();
    }
    clearField();
  });
});
