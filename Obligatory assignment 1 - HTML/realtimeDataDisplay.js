/**
 * Javascript for assignment 1; Real-time Data Display
 * 
 * @author Jesper Ruud Soløst
 * @file realtimeDataDisplay.js
 */

// List of locations and their API urls.
const locations = [
    "https://api.open-meteo.com/v1/forecast?latitude=59.91273&longitude=10.74609&current_weather=true", // Oslo
    "https://api.open-meteo.com/v1/forecast?latitude=59.33258&longitude=18.0649&current_weather=true",   // Stockholm
    "https://api.open-meteo.com/v1/forecast?latitude=55.67594&longitude=12.56553&current_weather=true", // Copenhagen
    "https://api.open-meteo.com/v1/forecast?latitude=60.16952&longitude=24.93545&current_weather=true", // Helsinki
    "https://api.open-meteo.com/v1/forecast?latitude=64.128288&longitude=-21.827774&current_weather=true" // Reykjavík
];

// Container element
const container = document.getElementById("card");
const updateInterval = 10000;

// Main function that updated the weather data
function updateWeatherData() {
    document.getElementById("card").innerHTML = "";
    // Loop through the locations and fetch their data through Open-Meteo API
    for (let i = 0; i < locations.length; i++) {
        fetch(locations[i])
            .then((response) => response.json())
            .then((json) => {
                // Extracting the weather details from the API response to json
                const temperature = json.current_weather.temperature; // Access temperature inside 'current_weather'
                const windspeed = json.current_weather.windspeed;
                const weatherCode = json.current_weather.weathercode;

                // Create elements to display the weather information
                const cityElement = document.createElement('h2');
                cityElement.textContent = getCity(i);

                const tempElement = document.createElement('p');
                tempElement.textContent = `Temperature: ${temperature}°C`;

                const windElement = document.createElement('p');
                windElement.textContent = `Windspeed: ${windspeed} km/h`;

                //const weatherCodeElement = document.createElement('p');
                //weatherCodeElement.textContent = `Weather Code: ${weatherCode}`;

                const weatherElement = document.createElement('p');
                weatherElement.textContent = `Weather: ${translateWeatherCode(weatherCode)}`;

                // Append the elements to the container
                container.appendChild(cityElement);
                container.appendChild(tempElement);
                container.appendChild(windElement);
                //container.appendChild(weatherCodeElement);
                container.appendChild(weatherElement);

                //console.log(getCity[i], temperature, windspeed, weatherCode, translateWeatherCode(weatherCode));
            })
            // Error catch
            .catch((error) => {
                console.error('Error fetching weather data:', error);
            });
    }

    // Adds a last updated timestamp
    const now = new Date();
    timeUpdated = `Last updated: ${now.getHours()}:${now.getMinutes()}`;
    document.getElementById("updateTime").textContent = timeUpdated;
}

// Sets update interval timer
setInterval(updateWeatherData, updateInterval);

// Initial fetch of data
updateWeatherData();

function getCity(city){
    if (city == 0) {return "Oslo, Norway"}
    if (city == 1) {return "Stockholm, Sweden"}
    if (city == 2) {return "Copenhagen, Denmark"}
    if (city == 3) {return "Helsinki, Finland"}
    if (city == 4) {return "Reykjavík, Iceland"}
}

function translateWeatherCode(code){
    if (code == 0) {return "Clear sky"}
    if (code == 1) {return "Mainly clear"}
    if (code == 2) {return "Partly cloudy"}
    if (code == 3) {return "Overcast"}
    if (code == 45) {return "Foggy"}
    if (code == 48) {return "Depositing rime fog"}
    if (code == 51) {return "Light drizzle"}
    if (code == 53) {return "Moderate drizzle"}
    if (code == 55) {return "Dense drizzle"}
    if (code == 56) {return "Light freezing drizzle"}
    if (code == 57) {return "Dense freezing drizzle"}
    if (code == 61) {return "Slight rain"}
    if (code == 63) {return "Moderate rain"}
    if (code == 65) {return "Heavy rain"}
    if (code == 66) {return "Light freezing rain"}
    if (code == 67) {return "Heavy freezing rain"}
    if (code == 71) {return "Slight snowfall"}
    if (code == 73) {return "Moderate snowfall"}
    if (code == 75) {return "Heavy snowfall"}
    if (code == 77) {return "Snow grains"}
    if (code == 80) {return "Slight rainshower"}
    if (code == 81) {return "Moderate rain showers"}
    if (code == 82) {return "Heavy rain showers"}
    if (code == 85) {return "Slight snow showers"}
    if (code == 86) {return "Heavy snow showers"}
    if (code == 95) {return "Thunderstorm"}
    if (code == 96) {return "Thunderstorm with slight hail"}
    if (code == 99) {return "Thunderstorm with heavy hail"}
}
