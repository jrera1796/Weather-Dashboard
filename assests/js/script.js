var cityInputEl = document.getElementById("#city-input");
var dayArray = ["day1", "day2", "day3", "day4", "day5"];
var tempArray = ["temp1", "temp2", "temp3", "temp4", "temp5"];
var windArray = ["wind1", "wind2", "wind3", "wind4", "wind5"]
var humArray = ["hum1", "hum2", "hum3", "hum4", "hum5"];
var imgArray = ["img1", "img2", "img3", "img4", "img5"]
var dataIA = [0, 8, 16, 24, 32];
var underSearchBtn = document.getElementById("underSearchBtn");
var cityName = "";
var cityList = [];


var getCity = function(){
  cityName = JSON.parse(localStorage.getItem('cityList'));
  currentWeather();
};

var currentWeather = function(){
  event.preventDefault();

  cityName = $(this).siblings("#city-input").val();

  
  var apiUrlForecast = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=fd5967fd42c5816f972f3c2953622952"
  var apiUrlCurrent = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=fd5967fd42c5816f972f3c2953622952"

  fetch(apiUrlCurrent)
  .then(function(response){return response.json()})
  .then(function(currentData){console.log(currentData)
    console.log(currentData);
    document.getElementById("c-name").textContent = currentData.name;
    document.getElementById("c-date").textContent = moment().format("MMMM, Do YYYY");
    document.getElementById("c-img").setAttribute("src", "https://openweathermap.org/img/wn/" + currentData.weather[0].icon + "@2x.png");
    
    var tempB = (currentData.main.temp - 273.15)*1.8+32;
    tempB = tempB.toString();
    tempB = tempB.substring(0,5);
   
    document.getElementById("c-temp").textContent = "Temp: " + tempB + "°F";
    document.getElementById("c-wind").textContent =  "Wind Speed: " + currentData.wind.speed + " MPH";
    document.getElementById("c-hum").textContent =  "Humidity: " + currentData.main.humidity + "%";
  });


  fetch(apiUrlForecast)
  .then(function(response){return response.json()})
  .then(function(data){console.log(data)
 
    for(var i = 0; i < 5; i++){
    document.getElementById(dayArray[i]).textContent = data.list[dataIA[i]].dt_txt.slice(5, data.list[dataIA[i]].dt_txt.length - 9) + "-2021";
    
    //Temperature conversion
    var temp = (data.list[dataIA[i]].main.temp - 273.15)*1.8+32;
    temp = temp.toString();
    temp = temp.substring(0,5);
    document.getElementById(tempArray[i]).textContent = "Temp: " + temp + "°F";

    //Wind and Humidity
    document.getElementById(windArray[i]).textContent = "Wind Speed: " + data.list[dataIA[i]].wind.speed + " MPH";
    document.getElementById(humArray[i]).textContent = "Humidity: " + data.list[dataIA[i]].main.humidity + "%";
    document.getElementById(imgArray[i]).setAttribute("src", "https://openweathermap.org/img/wn/" + data.list[dataIA[i]].weather[0].icon + "@2x.png");
  }
});
var createChild = function(){
var cityLocalId = Math.floor(Math.random()*33);

var populatedButton = document.createElement("button");
populatedButton.style = "width: 100%;";
populatedButton.type = "submit";
populatedButton.className = "cityBtn text-black my-1";
populatedButton.id = cityLocalId;
populatedButton.textContent = cityName;

underSearchBtn.appendChild(populatedButton);

cityList.push(cityName);
localStorage.setItem('cityList',JSON.stringify(cityName));

}

if($(this).siblings("#city-input").val()){
  console.log(this);
createChild();
}
else{
  console.log("There's nothing in text input")
}
};

$("#searchBtn").on("click", currentWeather);

