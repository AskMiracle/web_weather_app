const apiKey = '5ba09edf1cdf44c280b71218252602'; // Replace with your WeatherAPI.com API key
const apiUrl = 'https://api.weatherapi.com/v1/current.json';

const weatherForm = document.getElementById('weatherForm');
const locationInput = document.getElementById('locationInput');
const weatherResult = document.getElementById('weatherResult');

weatherForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent form submission
    const location = locationInput.value;

    if (location) {
        try {
            const response = await fetch(`${apiUrl}?key=${apiKey}&q=${location}`);
            const data = await response.json();

            if (data.location && data.current) {
                const weather = `
                    <h2>${data.location.name}, ${data.location.country}</h2>
                    <p>Temperature: ${data.current.temp_c}°C</p>
                    <p>Condition: ${data.current.condition.text}</p>
                    <img src="${data.current.condition.icon}" alt="${data.current.condition.text}">
                    <p>Humidity: ${data.current.humidity}%</p>
                    <p>Wind Speed: ${data.current.wind_kph} km/h</p>
                `;
                weatherResult.innerHTML = weather;
            } else {
                weatherResult.innerHTML = `<p>Location not found. Please try again.</p>`;
            }
        } catch (error) {
            console.error('Error fetching weather data:', error);
            weatherResult.innerHTML = `<p>Something went wrong. Please try again later.</p>`;
        }
    } else {
        weatherResult.innerHTML = `<p>Please enter a location.</p>`;
    }
});