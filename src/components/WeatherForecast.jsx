import React from 'react';
import {AppBar, Tab, Tabs} from '@material-ui/core';
import DateHandler from '../modules/dateHandler.js';
import weatherData from '../modules/weatherData';
import WeatherForecastTimes from './WeatherForecastTimes';
import Helper from '../modules/helperFunctions';
import Typography from '@material-ui/core/Typography';

const dateHandler = new DateHandler();
const timeValues = {
	threeAm: '03:00',
	nineAm: '09:00',
	threePm: '15:00',
	ninePm: '21:00'
};

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
				this.setSelectedDay(dateHandler.reformatDate.fromDisplayToApiFormat(dateHandler.getTommorowsDate()))
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
		selectedDay: dateHandler.reformatDate.fromDisplayToApiFormat(
						dateHandler.getTodaysDate()
					),
		forecastList: {threeAm: {}, nineAm: {}, threePm: {}, ninePm: {}}
	}

	handleTabChange = (event, newValue) => {
		this.setSelectedDay(dateHandler.reformatDate.fromDisplayToApiFormat(event.currentTarget.textContent))
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
			this.setForecastListItem(forecastItem);
		}
	}

	setForecastListItem = forecast => {
		switch (forecast.time) {
			case timeValues.threeAm:
				this.setForecastListState(forecast, 'threeAm');
				break;
			case timeValues.nineAm:
				this.setForecastListState(forecast, 'nineAm');
				break;
			case timeValues.threePm:
				this.setForecastListState(forecast, 'threePm');
				break;
			case timeValues.ninePm:
				this.setForecastListState(forecast, 'ninePm');
				break;
			default:
				break;
		}
	}

	setForecastListState = (forecast, timeString) => {
		let forecastList = this.state.forecastList;
		forecastList[timeString].time = forecast.time;
		forecastList[timeString].description = Helper.capitalizeSentence(forecast.weatherDescription);
		forecastList[timeString].weatherMain = forecast.weatherMain;
		forecastList[timeString].temperature = Helper.convertNumberToOneDecimal(forecast.temperature) + ' C°';
		this.setState({forecastList: forecastList});
	}

	render() {
		return (
			<div>
				<AppBar position='static' color='default'>
					<Tabs
						value={this.state.selectedTabNumber}
						onChange={this.handleTabChange.bind(this)}>
						<Tab label= {
							<Typography variant='headline' style={{whiteSpace: 'pre-line'}}>
								{dateHandler.getTodaysDate()}
							</Typography>
							}/>
						<Tab label={
								<Typography variant='headline' style={{whiteSpace: 'pre-line'}}>
									{dateHandler.getTommorowsDate()}
								</Typography>
							}/>
						<Tab label={
								<Typography variant='headline' style={{whiteSpace: 'pre-line'}}>
									{dateHandler.getTwoDaysAfterTodaysDate()}
								</Typography>
							}/>
						<Tab label={
								<Typography variant='headline' style={{whiteSpace: 'pre-line'}}>
									{dateHandler.getThreeDaysAfterTodaysDate()}
								</Typography>
							}/>
						<Tab label={
								<Typography variant='headline' style={{whiteSpace: 'pre-line'}}>
									{dateHandler.getFourDaysAfterTodaysDate()}
								</Typography>
							}/>
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
