

$(document).ready(function () {

  $("button").on('click', function () {
    var input = document.querySelector('#sx').value;
    let wKey = `b2867e9f08fe8c1b91348dcce117c830`;
    var daily_14 = "."
    //var apiFile=`https://bulk.openweathermap.org/snapshot/daily_14.json.gz?appid=${wKey}`; json file 
    var apiUrlKey = `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${wKey}`; //cant accesss it no more
    var forApi = `https://api.openweathermap.org/data/2.5/forecast?q=${input}&appid=${wKey}`;


    // Converts the response to JSON
    async function getWeatherInfo() {
      let response = await fetch(apiUrlKey);
      let data = await response.json();

      return data;
    }

    getWeatherInfo().then(data => {
      // console.log(data.list);
      // Search city name
      var iconList = data.weather[0].icon;
      var weatherIcon = $('<img id="weatherIcon">');
      weatherIcon.attr('src', `https://openweathermap.org/img/wn/${iconList}@2x.png`);
      let [month, date, year] = new Date().toLocaleDateString("en-US").split("/")
      //let dates = moment(input, 'M/DD/YY, h:mm a').add(1, 'd').format('YYYY-MM-DD') + ' 12:00:00';
      //console.log(dates);
      $(".name").append(data.name);
      $(".date").append(month + '/' + date + '/' + year);
      $("#weatherIcon").append(weatherIcon);
      $(".temp").append((Math.floor(data.main.temp - 273.15) * 1.80 + 32) + '℉ ');
      $(".humidity").prepend('Humidity: ')
      $(".humidity").append(data.main.humidity + '%');
      // $(".ftemp").append((Math.floor(data.main.temp - 273.15) * 1.80 + 32) + '℉ ');
      $(".wind").append(data.wind.speed + ' mph');
      // weatherIcon.appendTo('.name'); 
      $(".name").append(weatherIcon);
      let lon = data.coord.lon;
      let lat = data.coord.lat;
      //var oneCallApi=  `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude={part}&appid=${wKey}`
      var uvkey = `http://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${wKey}`;
      async function getUvInfo() {
        let uv = await fetch(uvkey);
        let uvData = await uv.json();
        return uvData;
      }
      getUvInfo().then(uvData => {

        $('.uv-index').append('uv-index: ' + uvData.value);
        localStorage.setItem('uv-index', JSON.stringify(uvData.value));
      }).catch(error => {
        if (uvData.status == 200) {
          return uvData.json();
        } else {
          alert('getUVinfo error');
        }
      });
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
    });
    async function getForecast() {
      let f = await fetch(forApi);
      let fdata = await f.json();
      return fdata;
    }
    getForecast().then(d => {

      Object.keys(d.list).forEach(function (key) {
        //console.log(key,d.list[key].dt_txt); prints date and time 
        console.log(key, d.list[key]);
        //  $('.ftemp1').append(d.list[0].main.temp- 273.15) * 1.80 + 32 + '℉ ');
        // console.log(key.list[key]);undefined
        //console.log(key.dt_txt); undefined
      });

      // var dateTxt = d.list[0].dt_txt; script.js:70 2020-11-09 21:00:00
      // console.log(d.list.length); array length 40 index
      function removeDuplicate(array) {
        return array.filter((a, b) => array.indexOf(a) === b);
      };
      function countOccurences(string, dates) {
        return string.split(dates).length - 1;
      }

      var dateTxt = d.list[0].dt_txt;  // stores out strings from object array
      //console.log(typeof d.list);
      var dateExtract = dateTxt.slice(0, 10); // out put 2020-11-09
      var dateExtractYear = dateExtract.slice(0, 4); //out put 
      var dateExtractMonth = dateExtract.slice(5, 7); // output mm
      var dateExtractday = dateExtract.slice(8, 10);  // output dd
      var getDate = dateExtractMonth + '/' + dateExtractday + '/' + dateExtractYear;
      var iconList1 = d.list[2].weather[0].icon;
      var weatherIcon1 = $('<img id="weatherIcon">');
      weatherIcon1.attr('src', `https://openweathermap.org/img/wn/${iconList1}@2x.png`);
      $(".fname1").append(weatherIcon1);
      $(".fdate1").append(getDate);
      $(".ftemp1").append(`Temp :${Math.floor(d.list[2].main.temp - 273.15) * 1.80 + 32}℉ `);
      $(".fhumidity1").append('Humidity:' + d.list[2].main.humidity + '%');
      var dateTxt = d.list[8].dt_txt;  // stores out strings from object array
      //console.log(typeof d.list);
      var dateExtract = dateTxt.slice(0, 10); // out put 2020-11-09
      var dateExtractYear = dateExtract.slice(0, 4); //out put 
      var dateExtractMonth = dateExtract.slice(5, 7); // output mm
      var dateExtractday = dateExtract.slice(8, 10);  // output dd
      var getDate = dateExtractMonth + '/' + dateExtractday + '/' + dateExtractYear;
      $(".fdate2").append(getDate);
      var iconList2 = d.list[10].weather[0].icon;
      var weatherIcon2 = $('<img id="weatherIcon">');
      weatherIcon2.attr('src', `https://openweathermap.org/img/wn/${iconList2}@2x.png`);
      $(".fname2").append(weatherIcon2);
      $(".ftemp2").append(`Temp :${Math.floor(d.list[10].main.temp - 273.15) * 1.80 + 32}℉ `);
      $(".fhumidity2").append('Humidity:' + d.list[10].main.humidity + '%');
      //  console.log(getDate);
      var dateTxt = d.list[16].dt_txt;  // stores out strings from object array
      //console.log(typeof d.list);
      var dateExtract = dateTxt.slice(0, 10); // out put 2020-11-09
      var dateExtractYear = dateExtract.slice(0, 4); //out put 
      var dateExtractMonth = dateExtract.slice(5, 7); // output mm
      var dateExtractday = dateExtract.slice(8, 10);  // output dd
      var getDate = dateExtractMonth + '/' + dateExtractday + '/' + dateExtractYear;
      $(".fdate3").append(getDate);
      var iconList3 = d.list[16].weather[0].icon;
      var weatherIcon3 = $('<img id="weatherIcon">');
      weatherIcon3.attr('src', `https://openweathermap.org/img/wn/${iconList3}@2x.png`);
      $(".fname3").append(weatherIcon3);
      $(".ftemp3").append(`Temp :${Math.floor(d.list[16].main.temp - 273.15) * 1.80 + 32}℉ `);
      $(".fhumidity3").append('Humidity:' + d.list[16].main.humidity + '%');
      var dateTxt = d.list[24].dt_txt;  // stores out strings from object array
      //console.log(typeof d.list);
      var dateExtract = dateTxt.slice(0, 10); // out put 2020-11-09
      var dateExtractYear = dateExtract.slice(0, 4); //out put 
      var dateExtractMonth = dateExtract.slice(5, 7); // output mm
      var dateExtractday = dateExtract.slice(8, 10);  // output dd
      var getDate = dateExtractMonth + '/' + dateExtractday + '/' + dateExtractYear;
      $(".fdate4").append(getDate);
      var iconList4 = d.list[24].weather[0].icon;
      var weatherIcon4 = $('<img id="weatherIcon">');
      weatherIcon4.attr('src', `https://openweathermap.org/img/wn/${iconList4}@2x.png`);
      $(".fname4").append(weatherIcon4);
      $(".ftemp4").append(`Temp :${Math.floor(d.list[24].main.temp - 273.15) * 1.80 + 32}℉ `);
      $(".fhumidity4").append('Humidity:' + d.list[24].main.humidity + '%');
      var dateTxt = d.list[32].dt_txt;  // stores out strings from object array
      //console.log(typeof d.list);
      var dateExtract = dateTxt.slice(0, 10); // out put 2020-11-09
      var dateExtractYear = dateExtract.slice(0, 4); //out put 
      var dateExtractMonth = dateExtract.slice(5, 7); // output mm
      var dateExtractday = dateExtract.slice(8, 10);  // output dd
      var getDate = dateExtractMonth + '/' + dateExtractday + '/' + dateExtractYear;
      $(".fdate5").append(getDate);
      var iconList5 = d.list[36].weather[0].icon;
      var weatherIcon5 = $('<img id="weatherIcon">');
      weatherIcon5.attr('src', `https://openweathermap.org/img/wn/${iconList5}@2x.png`);
      $(".fname5").append(weatherIcon4);
      $(".ftemp5").append(`Temp :${Math.floor(d.list[36].main.temp - 273.15) * 1.80 + 32}℉ `);
      $(".fhumidity5").append('Humidity:' + d.list[36].main.humidity + '%');






    });

    function clearField() {
      $(".name").empty();
      $(".humidity").empty();
      $(".wind").empty();
      $(".uv-index").empty();
      $(".ftemp1").empty();
      $(".ftemp2").empty();
      $(".ftemp3").empty();
      $(".ftemp4").empty();
      $(".ftemp5").empty();
      $(".uv-index").empty();
      $('.date').empty();
      $(".fdate1").empty();
      $(".fdate1").empty();
      $(".fdate2").empty();
      $(".fdate3").empty();
      $(".fdate4").empty();
      $(".fdate5").empty();
      $(".fname1").empty();
      $(".fname2").empty();
      $(".fname3").empty();
      $(".fname4").empty();
      $(".fname5").empty();
      $(".humidity").empty();
      $(".fhumidity1").empty();
      $(".fhumidity2").empty();
      $(".fhumidity3").empty();
      $(".fhumidity4").empty();
      $(".fhumidity5").empty();
      $(".wind").empty();
      $(".uv-index").empty();
      $(".temp").empty();
      $(".uv-index").empty();
      $('.date').empty();
      $(".fdate1").empty();
      $(".fdate1").empty();
      $(".fdate2").empty();
      $(".fdate3").empty();
      $(".fdate4").empty();
      $(".fdate5").empty();
    }
    clearField();
  });

});
