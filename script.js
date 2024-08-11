let apiKey = 'b7a5706c527dda625f31ab7551f78fe2'; // Replace with your actual OpenWeatherMap API key
let form = document.querySelector("form");
let cityElement = document.querySelector('.name');
let temperatureElement = document.querySelector('.temperature');
let descriptionElement = document.querySelector('.description');
let valueSearch = document.getElementById('name');
let cloudsElement = document.getElementById('clouds');
let humidityElement = document.getElementById('humidity');
let pressureElement = document.getElementById('pressure');
let main = document.querySelector('main');

form.addEventListener("submit", (e) => {
    e.preventDefault();  
    if (valueSearch.value != '') {
        searchWeather(valueSearch.value);
    }
});

const searchWeather = (city) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod == 200) {
                cityElement.querySelector('figcaption').innerText = data.name;
                cityElement.querySelector('img').src = `https://flagsapi.com/${data.sys.country}/shiny/32.png`;
                temperatureElement.querySelector('img').src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
                temperatureElement.querySelector('span').innerText = data.main.temp;
                descriptionElement.innerText = data.weather[0].description;

                cloudsElement.innerText = data.clouds.all;
                humidityElement.innerText = data.main.humidity;
                pressureElement.innerText = data.main.pressure;
            } else {
                main.classList.add('error');
                setTimeout(() => {
                    main.classList.remove('error');
                }, 1000);
            }
            valueSearch.value = '';
        })
        .catch(error => {
            console.error('Error fetching the weather data:', error);
            alert('An error occurred. Please try again later.');
        });
}

// Initialize with a default city
const initApp = () => {
    valueSearch.value = 'Saharsa';
    searchWeather('Saharsa');
}
initApp();
