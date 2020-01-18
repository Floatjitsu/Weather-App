import request from 'request';

const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric';
const apiKey = 'appid=63adac7ad2e70d880b81ccda4407faeb';

const getCurrentWeatherForCity = city => {
	return new Promise((resolve, reject) => {
		request(apiUrl + '&q=' + city + '&' + apiKey, (error, response, body) => {
			if (response.statusCode === 200) {
				const jsonBody = JSON.parse(body);
				resolve({
					temperatureNow: jsonBody.main.temp,
					weather: jsonBody.weather[0].main
				});
			} else {
				reject(response.statusMessage);
			}
		});
	});
};

export default getCurrentWeatherForCity;
