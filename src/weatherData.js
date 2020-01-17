import request from 'request';

const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric';
const apiKey = 'appid=63adac7ad2e70d880b81ccda4407faeb';

const getCurrentWeatherForCity = city => {
	return new Promise((resolve, reject) => {
		request(apiUrl + '&q=' + city + '&' + apiKey, (error, response, body) => {
			if (!error) {
				resolve(JSON.parse(body).main.temp);
			} else {
				reject(error);
			}
		});
	});
};

export default getCurrentWeatherForCity;
