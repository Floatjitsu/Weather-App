import request from 'request';
import moment from 'moment';

const apiUrl = 'https://api.openweathermap.org/data/2.5/';
const currentWeatherUrlParam = 'weather';
const forecastWeatherUrlParam = 'forecast';
const metricUnitUrlParam = 'metric'; // To get temperature in C°
const apiKey = '63adac7ad2e70d880b81ccda4407faeb';

const weatherForecastForCity = {};

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
}

const getWeatherForecast = (city, date) => {
	if (weatherForecastForCity.city === city) {
		let result = [];
		for (const forecast of weatherForecastForCity.forecast) {
			if (forecast.dt_txt.includes(date)) {
				result.push(extractDataFromForecastObject(forecast));
			}
		}
		return result;
	}
	return [];
}

const extractDataFromForecastObject = forecastObject => {
	return {
		time: forecastObject.dt_txt.split(' ')[1].slice(0, 5),
		weather: forecastObject.weather[0]
	};
}

export default {getCurrentWeatherForCity, loadWeatherForecastForCity, getWeatherForecast};
