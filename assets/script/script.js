

$(document).ready(function () {
  $("button").on('click', function () {
    var input = document.querySelector('#sx').value;
    let wKey = `768d6bd4bf42c06b0464c112e838748f`;
    var apiUrlKey = `http://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${wKey}`;
    var forApi=`https://api.openweathermap.org/data/2.5/forecast?q=${input}&appid=${wKey}`;

    // Converts the response to JSON
    async function getWeatherInfo() {
      let response = await fetch(apiUrlKey);
      let data = await response.json();

      return data;
    }

    getWeatherInfo().then(data => {
      // console.log(data.city);
      // Search city name
      var iconList = data.weather[0].icon;
      var weatherIcon = $('<img id="weatherIcon">');
      weatherIcon.attr('src', `http://openweathermap.org/img/wn/${iconList}@2x.png`);
     let [month, date, year]    = new Date().toLocaleDateString("en-US").split("/")
      let dates=moment(input, 'M/DD/YY, h:mm a').add(1, 'd').format('YYYY-MM-DD') + ' 12:00:00';
      console.log(dates);
      $(".name").append(data.name);
      $(".date").append(month+'/'+date+'/'+year);
    
      $(".temp").append((Math.floor(data.main.temp - 273.15) * 1.80 + 32) + '℉ ');
      $(".humidity").prepend('Humidity: ')
      $(".humidity").append(data.main.humidity + '%');
      $(".ftemp").append((Math.floor(data.main.temp - 273.15) * 1.80 + 32) + '℉ ');
      $(".wind").append(data.wind.speed + ' mph');
      // weatherIcon.appendTo('.name'); 
      $(".name").append(weatherIcon);
      let lon = data.coord.lon;
      let lat = data.coord.lat;
      var uvkey = `http://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${wKey}`;
      async function getUvInfo() {
        let uv = await fetch(uvkey);
        let uvData = await uv.json();
        return uvData;
      }
      getUvInfo().then(uvData => {

        $('.uv-index').append('uv-index: ' + uvData.value);
        localStorage.setItem('uv-index',JSON.stringify(uvData.value));
      });
      async function getForecast(){
        let f= await fetch(forApi);
        let fdata= await f.json();
        return fdata;
      }
      getForecast().then(d=>{
         
          console.log(d.list[0].dt_txt);
         // $(".fdate1").append(String.d.list[0].dt_txt.Format("0:mm/dd/yyy"));
         
      });
      var createList = $("<li></li>").text(input)
      createList.attr('class', 'list-unstyled h5 list-group-item');
      createList.attr('id', 'getItems');

      $('.searcheditem').append(createList);
      // create a local storage to save the city names 
      localStorage.setItem('city',JSON.stringify(data.name));
      localStorage.setItem('tempCity',JSON.stringify(Math.floor(data.main.temp - 273.15) * 1.80 + 32) + '℉ ');
      localStorage.setItem('wind',JSON.stringify(data.wind.speed + ' mph'));
      localStorage.setItem('humidity',JSON.stringify(data.main.humidity + '%'));
     // localStorage.setItem('icon',weatherIcon);
     
      var cityWeatherObj={
        city: localStorage.getItem('city'),
        temp: localStorage.getItem('tempCity'),
        wind: localStorage.getItem('wind'),
        uv: localStorage.getItem('uv-index'),
        //icon: localStorage.getItem('icon')
      }
     
        
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
  
});
