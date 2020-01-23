import React from 'react';
import {AppBar, Tab, Tabs} from '@material-ui/core';
import DateHandler from './dateHandler.js';
import weatherData from './weatherData';
import moment from 'moment';
import WeatherForecastTimes from './WeatherForecastTimes';

const forecastTimes = ['03:00', '09:00', '15:00', '21:00'];
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
				this.setForecastList();
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
		this.setSelectedDay(dateHandler.reformatDateFromDisplayToApiFormat(event.currentTarget.textContent));
		this.setSelectedTabNumber(newValue);
		this.setForecastList();
	}

	setSelectedTabNumber = value => {
		this.setState({
			selectedTabNumber: value
		})
	}

	setSelectedDay = value => {
		this.setState({
			selectedDay: value
		});
	}

	setForecastList = () => {
		for (const time of forecastTimes) {
			const forecast = weatherData.getWeatherForecastForCityDateTime(
				this.props.value, this.state.selectedDay, time
			);
			this.setForecastListState(time, forecast.weather.description);
		}
	}

	setForecastListState = (time, weatherDescription) => {
		let forecastList = this.state.forecastList;
		switch (time) {
			case '03:00':
				forecastList.threeAm = weatherDescription;
				this.setState({forecastList: forecastList});
				break;
			case '09:00':
				forecastList.nineAm = weatherDescription;
				this.setState({forecastList: forecastList});
				break;
			case '15:00':
				forecastList.threePm = weatherDescription;
				this.setState({forecastList: forecastList});
				break;
			case '21:00':
				forecastList.ninePm = weatherDescription;
				this.setState({forecastList: forecastList});
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
