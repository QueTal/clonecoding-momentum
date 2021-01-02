const weather = document.querySelector(".js-weather");
const API_KEY = "2fb1b957d16dbdd5ad66ef3255bdbfee";
const COORDS = 'coords';

function getWeather(lat, lng){
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
    ).then(function(response){
        return response.json();
    }).then(function(json){
        const temperatrue = json.main.temp;
        const place = json.name;
        console.log(json);
        weather.innerText = `${temperatrue} @ ${place}`;
    });


}
function saveCoord(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));

}
function handleGeoSuccess(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };
    saveCoord(coordsObj);
    getWeather(latitude, longitude);
}
function handleGeoError(){
    console.log("error");
}
function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError)
}

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null){
        askForCoords();
    } else{
        const parsedCoords = JSON.parse(loadedCoords);
        getWeather(parsedCoords.latitude, parsedCoords.longitude);
    }
}
function init(){
    loadCoords();
}

init();