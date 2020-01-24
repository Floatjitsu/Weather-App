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
		forecastList: {}
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
			this.setForecastListState(forecastItem.time, forecastItem.weather.description);
		}
	}

	setForecastListState = (time, weatherDescription) => {
		let forecastList = this.state.forecastList;
		switch (time) {
			case '03:00':
				forecastList.threeAm = Helper.capitalizeSentence(weatherDescription);
				this.setState({forecastList: forecastList});
				break;
			case '09:00':
				forecastList.nineAm = Helper.capitalizeSentence(weatherDescription);
				this.setState({forecastList: forecastList});
				break;
			case '15:00':
				forecastList.threePm = Helper.capitalizeSentence(weatherDescription);
				this.setState({forecastList: forecastList});
				break;
			case '21:00':
				forecastList.ninePm = Helper.capitalizeSentence(weatherDescription);
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
