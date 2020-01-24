import React from 'react';
import {AppBar, Tab, Tabs} from '@material-ui/core';
import DateHandler from './dateHandler.js';
import weatherData from './weatherData';
import WeatherForecastTimes from './WeatherForecastTimes';
import Helper from './helperFunctions';

const dateHandler = new DateHandler();

class WeatherComponent extends React.Component {

	componentDidMount = () => {
		weatherData.loadWeatherForecastForCity(this.props.value).then(() => {
			this.setForecastList();
		}).catch(error => {
			console.error(error);
		});
	}

	componentDidUpdate = prevProps => {
		if (prevProps.value !== this.props.value) {
			this.setSelectedTabNumber(0);
			weatherData.loadWeatherForecastForCity(this.props.value).then(() => {
				this.setSelectedDay(dateHandler.reformatDateFromDisplayToApiFormat(dateHandler.getTommorowsDate()))
					.then(result => {
						this.setForecastList();
					});
			}).catch(error => {
				console.error(error);
			});
		}
	}

	state = {
		selectedTabNumber: 0,
		selectedDay: dateHandler.reformatDateFromDisplayToApiFormat(
						dateHandler.getTommorowsDate()
					),
		forecastList: {threeAm: {}, nineAm: {}, threePm: {}, ninePm: {}}
	}

	handleTabChange = (event, newValue) => {
		this.setSelectedDay(dateHandler.reformatDateFromDisplayToApiFormat(event.currentTarget.textContent))
			.then(() => {
				this.setSelectedTabNumber(newValue);
				this.setForecastList();
			});
	}

	setSelectedTabNumber = value => {
		this.setState({
			selectedTabNumber: value
		})
	}

	setSelectedDay = value => {
		return new Promise((resolve, reject) => {
			this.setState({
				selectedDay: value
			});
			resolve();
		});

	}

	setForecastList = () => {
		const forecast = weatherData.getWeatherForecastForCityDate(
			this.props.value, this.state.selectedDay);
		for (const forecastItem of forecast) {
			this.setForecastListState(forecastItem);
		}
	}

	setForecastListState = (forecast) => {
		let forecastList = this.state.forecastList;
		switch (forecast.time) {
			case '03:00':
				forecastList.threeAm.time = forecast.time;
				forecastList.threeAm.description = Helper.capitalizeSentence(forecast.weatherDescription);
				forecastList.threeAm.weatherMain = forecast.weatherMain;
				this.setState({forecastList: forecastList});
				break;
			case '09:00':
				forecastList.nineAm.time = forecast.time;
				forecastList.nineAm.description = Helper.capitalizeSentence(forecast.weatherDescription);
				forecastList.nineAm.weatherMain = forecast.weatherMain;
				this.setState({forecastList: forecastList});
				break;
			case '15:00':
				forecastList.threePm.time = forecast.time;
				forecastList.threePm.description = Helper.capitalizeSentence(forecast.weatherDescription);
				forecastList.threePm.weatherMain = forecast.weatherMain;
				this.setState({forecastList: forecastList});
				break;
			case '21:00':
				forecastList.ninePm.time = forecast.time;
				forecastList.ninePm.description = Helper.capitalizeSentence(forecast.weatherDescription);
				forecastList.ninePm.weatherMain = forecast.weatherMain;
				this.setState({forecastList: forecastList});
				break;
			default:
				break;
		}
	}

	render() {
		return (
			<div>
				<AppBar position='static' color='default'>
					<Tabs
						value={this.state.selectedTabNumber}
						onChange={this.handleTabChange.bind(this)}>
						<Tab label={dateHandler.getTommorowsDate()} />
						<Tab label={dateHandler.getTwoDaysAfterTodaysDate()} />
						<Tab label={dateHandler.getThreeDaysAfterTodaysDate()} />
						<Tab label={dateHandler.getFourDaysAfterTodaysDate()} />
					</Tabs>
				</AppBar>
				<div className='weatherForecastList'>
					<WeatherForecastTimes forecastList={this.state.forecastList} />
				</div>
			</div>
		);
	}

}

export default WeatherComponent;
