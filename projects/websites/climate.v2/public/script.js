const fetchWeather = async (city = '') => {
    const cityName = city || document.getElementById('city').value;
    const errorElement = document.getElementById('error');
    const weatherElement = document.getElementById('weather');
    weatherElement.textContent = "Carregando...";
    if (!cityName) {
        errorElement.textContent = 'Por favor, digite uma cidade.';
        weatherElement.style.display = 'none';
        return;
    }
    errorElement.textContent = '';
    document.querySelector('body').style.cursor = 'wait';
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=2fb9e2e8db75128062724fdeca8fe09d&units=metric&lang=pt`);
        if (!response.ok) {
            throw new Error('Cidade não encontrada');
        }
        const data = await response.json();
        saveSearchHistory(cityName);
        const weather = `
        <div id="table">
            <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="Clima">
            <h2>${data.name}, ${data.sys.country}</h2>
            <p>${data.weather[0].description}</p>
            <table>
                <tr><th>Temperatura</th><td>${data.main.temp}°C</td></tr>
                <tr><th>Temperatura Máxima</th><td>${data.main.temp_max}°C</td></tr>
                <tr><th>Temperatura Mínima</th><td>${data.main.temp_min}°C</td></tr>
                <tr><th>Humidade</th><td>${data.main.humidity}%</td></tr>
                <tr><th>Vento</th><td>${data.wind.speed} m/s</td></tr>
            </table>
        </div>
        `;
        document.querySelector('body').style.cursor = 'default';
        weatherElement.innerHTML = weather;
        weatherElement.style.display = 'block';
        updateHistory();
    } catch (error) {
        document.querySelector('body').style.cursor = 'default';
        errorElement.textContent = 'Cidade não encontrada ou erro ao carregar.';
        weatherElement.style.display = 'none';
    }
};
const saveSearchHistory = (city) => {
    let history = JSON.parse(localStorage.getItem('searchHistory')) || [];
    if (!history.includes(city)) {
        history.push(city);
        localStorage.setItem('searchHistory', JSON.stringify(history));
    }
};
const updateHistory = () => {
    const historyTable = document.getElementById('content');
    let history = JSON.parse(localStorage.getItem('searchHistory')) || [];
    historyTable.innerHTML = '';
    history.forEach(city => {
        const row = document.createElement('tr');
        const cell = document.createElement('td');
        cell.textContent = city;
        row.appendChild(cell);
        historyTable.appendChild(row);
    });
};

// Atualizar o histórico quando a página for carregada
window.onload = updateHistory;
