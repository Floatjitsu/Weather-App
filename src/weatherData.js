import request from 'request';

const apiUrl = 'https://api.openweathermap.org/data/2.5/';
const currentWeatherUrlParam = 'weather';
const forecastWeatherUrlParam = 'forecast';
const metricUnitUrlParam = 'metric'; // To get temperature in C°
const apiKey = '63adac7ad2e70d880b81ccda4407faeb';
const forecastTimes = ['03:00', '09:00', '15:00', '21:00'];
let weatherForecastForCity = {};

const getCurrentWeatherForCity = city => {
	const queryParameters = {
		q: city,
		units: metricUnitUrlParam,
		appid: apiKey
	};
	return new Promise((resolve, reject) => {
		request({url: apiUrl + currentWeatherUrlParam, qs: queryParameters}, (error, response, body) => {
 			if (response.statusCode === 200) {
 				const jsonBody = JSON.parse(body);
 				resolve({
 					temperatureNow: jsonBody.main.temp,
 					weather: jsonBody.weather[0].main,
 					weatherDescription: jsonBody.weather[0].description
 				});
 			} else {
 				reject(response.statusMessage);
 			}
 		});
	});
};

const loadWeatherForecastForCity = city => {
	const queryParameters = {
		q: city,
		units: metricUnitUrlParam,
		appid: apiKey
	};
	return new Promise((resolve, reject) => {
		request({url: apiUrl + forecastWeatherUrlParam, qs: queryParameters}, (error, response, body) => {
			if (response.statusCode === 200) {
				const jsonBody = JSON.parse(body);
				weatherForecastForCity.city = city;
				weatherForecastForCity.forecast = jsonBody.list;
				resolve();
			} else {
				reject(response.statusMessage);
			}
		});
	});
};

const getWeatherForecastForCityDate = (city, date) => {
	if (weatherForecastForCity.city === city) {
		let result = [];
		for (const forecast of weatherForecastForCity.forecast) {
			if (forecast.dt_txt.includes(date) && _timeStringIncludesTime(forecast.dt_txt)) {
				result.push(_extractDataFromForecastObject(forecast));
			}
		}
		return result;
	} else {
		return [];
	}
};

const _extractDataFromForecastObject = forecastObject => {
	let newForecastObject = {
		time: forecastObject.dt_txt.split(' ')[1].slice(0, 5),
		weatherDescription: forecastObject.weather[0].description,
		temperature: forecastObject.main.temp
	}
	if (newForecastObject.time === '21:00' && newForecastObject.weatherDescription === 'clear sky') {
		newForecastObject.weatherMain = forecastObject.weather[0].main + ' Night';
	} else {
		newForecastObject.weatherMain = forecastObject.weather[0].main;
	}
	return newForecastObject;
};

const _timeStringIncludesTime = timeString => {
	for (const time of forecastTimes) {
		if (timeString.includes(time)) {
			return true;
		}
	}
	return false;
};

export default {getCurrentWeatherForCity, loadWeatherForecastForCity, getWeatherForecastForCityDate};
