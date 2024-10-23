const apiKey = "f81097f963851f9aa4d52e0a5101edc3";

const searchQuery = document.querySelector("#searchQuery");
const searchBtn = document.querySelector(".searchBtn");
const currentDegree = document.querySelector(".currentDegree");
const feelDegree = document.querySelector(".feelDegree");
const weatherIcon = document.querySelector(".weatherIcon");
const weatherIconText = document.querySelector(".weatherIconText");
const currentDate = document.querySelector(".currentDate");
const dayTemp = document.querySelector(".dayTemp");
const nightTemp = document.querySelector(".nightTemp");
const windSpeedValue = document.querySelector(".windSpeedValue");
const rainChanceValue = document.querySelector(".rainChanceValue");
const pressureValue = document.querySelector(".pressureValue");
const uvIndexValue = document.querySelector(".uvIndexValue");
const sunriseValue = document.querySelector(".sunriseValue");
const sunsetValue = document.querySelector(".sunsetValue");

searchBtn.addEventListener('click', getData)

async function getData() {
  const query = searchQuery.value;
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${query}&appid=${apiKey}&units=metric`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    console.log(json);

    Degree(json);
    visual(json);
    const unixToTime = timeConverter(json.list[0].dt);
    currentDate.innerHTML = `${unixToTime}`;
    // dayTemp.innerHTML   --> to be done
    // nightTemp.innerHTML   --> to be done
    wrpu(json);

    hourlyForcastDetails(json);
    footer(json);
  } catch (error) {
    console.log(error.message);
  }
  console.log("hello");
}

function Degree(json) {
  currentDegree.innerHTML = `${Math.round(json.list[0].main.temp)}°`;
  feelDegree.innerHTML = `Feels like ${Math.round(json.list[0].main.feels_like)}°`;
}
function visual(json) {
  weatherIcon.src = `http://openweathermap.org/img/w/${json.list[0].weather[0].icon}.png`
  weatherIconText.innerHTML = `${json.list[0].weather[0].main}`
}
function wrpu(json) {
  windSpeedValue.innerHTML = `${json.list[0].wind.speed} km/h`;
  rainChanceValue.innerHTML = `${json.list[0].pop} %`;
  pressureValue.innerHTML = `${json.list[0].main.pressure} hpa`;
}
function timeConverter(unix) {
  var a = new Date(unix * 1000);
  var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var time = month + ' ' + date + ', ' + hour + ':' + min;
  return time;
}

function hourlyForcastDetails(json) {
  const main = document.querySelector(".hourlyForcast .main");
  main.innerHTML = "";
  for (let i = 0; i < 6; i++) {
    const div = document.createElement("div");
    const time = document.createElement("p");
    const image = document.createElement("img");
    const degree = document.createElement("p");
    div.classList.add("hourlyForcastDetails");

    var a = new Date(json.list[i].dt * 1000);
    var hour = a.getHours();
    time.innerHTML = `${hour} hr`;
    image.src = `http://openweathermap.org/img/w/${json.list[i].weather[0].icon}.png`
    degree.innerHTML = `${Math.round(json.list[i].main.temp)}°`;


    div.append(time);
    div.append(image);
    div.append(degree);

    main.append(div);
  }
}

function footer(json) {
  var rise = new Date(json.city.sunrise * 1000);
  var riseHour = rise.getHours();
  var riseMin = rise.getMinutes();
  var set = new Date(json.city.sunset * 1000);
  var setHour = set.getHours();
  var setMin = set.getMinutes();
  sunriseValue.innerHTML = riseHour+":"+riseMin;
  sunsetValue.innerHTML = setHour+":"+setMin;
}
