const fetchWeather = async () => {
    const city = document.getElementById('city').value.trim();
    const errorElement = document.getElementById('error');
    const weatherElement = document.getElementById('weather');

    if (!city) {
        errorElement.textContent = 'Por favor, insira o nome de uma cidade.';
        weatherElement.innerHTML = '';
        return;
    }

    errorElement.textContent = '';
    weatherElement.innerHTML = '';

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=2fb9e2e8db75128062724fdeca8fe09d&units=metric&lang=pt`);

        if (!response.ok) {
            throw new Error('Cidade não encontrada.');
        }

        const data = await response.json();

        weatherElement.innerHTML = `
            <h2>${data.name}, ${data.sys.country}</h2>
            <p><strong>${data.main.temp}°C</strong></p>
            <p>${data.weather[0].description}</p>
            <p>Sensação térmica: ${data.main.feels_like}°C</p>
            <p>Umidade: ${data.main.humidity}%</p>
        `;
    } catch (err) {
        errorElement.textContent = err.message;
    }
};
