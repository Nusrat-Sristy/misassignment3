async function fetchCountryData() {
    const countryName = document.getElementById("country-name").value.trim();
    if (countryName === "") {
        alert("Please enter a country name.");
        return;
    }

    try {
        
        const countryResponse = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
        const countryData = await countryResponse.json();

        if (countryData.status === 404) {
            alert("Country not found.");
            return;
        }

        const country = countryData[0];
        const countryCode = country.cca2.toLowerCase();

        
        const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${countryName}&appid=55d7f3f18f250783fc8d7c61b38502cc&units=metric`);
        const weatherData = await weatherResponse.json();

        const weather = weatherData.main;
        const countryInfoHTML = `
            <div class="country-card">
                <img src="https://flagcdn.com/w320/${countryCode}.png" alt="${countryName} Flag">
                <h3>${countryName}</h3>
                <p>Capital: ${country.capital ? country.capital[0] : "N/A"}</p>
                <p>Population: ${country.population}</p>
                <p>Weather: ${weather.temp}°C, ${weather.humidity}% Humidity</p>
                <button onclick="showMoreDetails('${countryName}', '${country.capital[0]}', '${country.population}')">More Details</button>
            </div>
        `;

        document.getElementById("results").innerHTML = countryInfoHTML;
    } catch (error) {
        alert("An error occurred while fetching the data.");
        console.error(error);
    }
}

function showMoreDetails(countryName, capital, population) {
    alert(`
        Country: ${countryName}
        Capital: ${capital}
        Population: ${population}
        More info coming soon!
    `);
}
