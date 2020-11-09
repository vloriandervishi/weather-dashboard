

$(document).ready(function () {
  $("button").on('click', function () {
    var input = document.querySelector('#sx').value;
    let wKey = `b2867e9f08fe8c1b91348dcce117c830`;
    var daily_14="."
    var apiFile=`https://bulk.openweathermap.org/snapshot/daily_14.json.gz?appid=${wKey}`;
    var apiUrlKey = `http://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${wKey}`;
    var forApi = `https://api.openweathermap.org/data/2.5/forecast?q=${input}&appid=${wKey}`;

    // Converts the response to JSON
    async function getWeatherInfo() {
      let response = await fetch(apiUrlKey);
      let data = await response.json();

      return data;
    }

    getWeatherInfo().then(data => {
     console.log(data.list);
      // Search city name
      var iconList = data.weather[0].icon;
      var weatherIcon = $('<img id="weatherIcon">');
      weatherIcon.attr('src', `http://openweathermap.org/img/wn/${iconList}@2x.png`);
      let [month, date, year] = new Date().toLocaleDateString("en-US").split("/")
      //let dates = moment(input, 'M/DD/YY, h:mm a').add(1, 'd').format('YYYY-MM-DD') + ' 12:00:00';
      //console.log(dates);
      $(".name").append(data.name);
      $(".date").append(month + '/' + date + '/' + year);

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
        localStorage.setItem('uv-index', JSON.stringify(uvData.value));
      }).catch(error=>{
        if (uvData.status == 200) {
          return uvData.json();
        } else {
         alert('getUVinfo error');
        }
      });
      async function getForecast() {
        let f = await fetch(forApi);
        let fdata = await f.json();
        return fdata;
      }
      getForecast().then(d => {
        
        var dateTxt = d.list[0].dt_txt;
         var dateExtract = dateTxt.slice(0, 10); // out put 2020-11-09
        var dateExtractYear = dateExtract.slice(0, 4); //out put 
         var dateExtractMonth = dateExtract.slice(5, 7); // output mm
         var dateExtractday = dateExtract.slice(8, 10);  // output dd
         // date extracted
         var getDate0 = dateExtractMonth + '/' + dateExtractday + '/' + dateExtractYear;
        var getDate1 = dateExtractMonth + '/' + (parseInt(dateExtractday) + 1) + '/' + dateExtractYear;
         var getDate2 = dateExtractMonth + '/' + (parseInt(dateExtractday) + 2) + '/' + dateExtractYear;
         var getDate3 = dateExtractMonth + '/' + (parseInt(dateExtractday) + 3) + '/' + dateExtractYear;
        var getDate4 = dateExtractMonth + '/' + (parseInt(dateExtractday) + 4) + '/' + dateExtractYear;
       
         $(".fdate1").append(getDate0);
         $(".ftemp").append((Math.floor(data.list[0].main.temp - 273.15) * 1.80 + 32) + '℉ ');
         $(".fhumidity").append(data.main.humidity + '%');
         $(".fwind").append(data.list[0].wind.speed + ' mph');
         $(".fdate2").append(getDate1);
       $(".fdate3").append(getDate2);
        $(".fdate4").append(getDate3);
         $(".fdate5").append(getDate4);
         
        
        var createList = $("<li></li>").text(input)
        createList.attr('class', 'list-unstyled h5 list-group-item');
        createList.attr('id', 'getItems');

        $('.searcheditem').append(createList);
        // create a local storage to save the city names 
        localStorage.setItem('city', JSON.stringify(data.name));
        localStorage.setItem('tempCity', JSON.stringify(Math.floor(data.main.temp - 273.15) * 1.80 + 32) + '℉ ');
        localStorage.setItem('wind', JSON.stringify(data.wind.speed + ' mph'));
        localStorage.setItem('humidity', JSON.stringify(data.main.humidity + '%'));
        // localStorage.setItem('icon',weatherIcon);

        var cityWeatherObj = {
          city: localStorage.getItem('city'),
          temp: localStorage.getItem('tempCity'),
          wind: localStorage.getItem('wind'),
          uv: localStorage.getItem('uv-index'),
          //icon: localStorage.getItem('icon')
        }


      }).catch(error=>{
          if (data.status == 200) {
            return data.json();
          } else {
            alert('getWeather error');
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
        // $(".fdate1").empty();
        // $(".fdate1").empty();
        // $(".fdate2").empty();
        // $(".fdate3").empty();
        // $(".fdate4").empty();
        // $(".fdate5").empty();
      }
      clearField();

    });

  });
});
