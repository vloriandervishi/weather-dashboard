


$(document).ready(function () {
  $("button").on('click', function () {
    var input = document.querySelector('#sx').value;
    let wKey = `768d6bd4bf42c06b0464c112e838748f`;
    var apiUrlKey = `http://api.openweathermap.org/data/2.5/forecast?q=${input}&appid=${wKey}`;

    // Converts the response to JSON
    async function getWeatherInfo() {
      let response = await fetch(apiUrlKey);
      let data = await response.json();

      return data;
    }

    getWeatherInfo().then(data => {
      // console.log(data.city);
      // Search city name
      var iconList = data.list[0].weather[0].icon;
      var weatherIcon = $('<img id="weatherIcon">');
      weatherIcon.attr('src', `http://openweathermap.org/img/wn/${iconList}@2x.png`);

      $(".name").append(data.city.name);

      $(".temp").append((Math.floor(data.list[0].main.temp - 273.15) * 1.80 + 32) + '℉ ');
      $(".humidity").prepend('Humidity: ')
      $(".humidity").append(data.list[0].main.humidity + '%');
      $(".ftemp").append((Math.floor(data.list[0].main.temp - 273.15) * 1.80 + 32) + '℉ ');
      $(".wind").append(data.list[0].wind.speed + ' mph');
      // weatherIcon.appendTo('.name'); 
      $(".name").append(weatherIcon);
      let lon = data.city.coord.lon;
      let lat = data.city.coord.lat;
      var uvkey = `http://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${wKey}`;
      async function getUvInfo() {
        let uv = await fetch(uvkey);
        let uvData = await uv.json();
        return uvData;
      }
      getUvInfo().then(uvData => {

        $('.uv-index').append('uv-index: ' + uvData.value);
      });
      var createList = $("<li></li>").text(input)
      createList.attr('class', 'list-unstyled   h5 list-group-item');

      $('.searcheditem').append(createList);


    });

    function clearField() {
      $(".name").empty();
      $(".humidity").empty();
      $(".wind").empty();
      $(".uv-index").empty();
      $(".temp").empty();
      $(".uv-index").empty();
      $('.date').empty();

    }
    clearField();
  });
  //
});
