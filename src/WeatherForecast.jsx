import React from 'react';
import {AppBar, Tab, Tabs} from '@material-ui/core';
import DateHandler from './dateHandler.js';
import weatherData from './weatherData';
import moment from 'moment';
import WeatherForecastTimes from './WeatherForecastTimes';

const dateHandler = new DateHandler();

class WeatherComponent extends React.Component {

	componentDidMount = () => {
		const tomorrow =
			dateHandler.reformatDateFromDisplayToApiFormat(
				dateHandler.getTommorowsDate()
			);
		weatherData.loadWeatherForecastForCity(this.props.value).then(() => {
			console.log('Data loaded!');
		}).catch(error => {
			console.error(error);
		});
	}

	componentDidUpdate = prevProps => {
		if (prevProps.value !== this.props.value) {
			this.setSelectedTabNumber(0);
			weatherData.loadWeatherForecastForCity(this.props.value).then(() => {
				console.log('Data loaded!');
			}).catch(error => {
				console.error(error);
			});
		}
	}

	state = {
		selectedTabNumber: 0,
		selectedDay: dateHandler.reformatDateFromDisplayToApiFormat(
						dateHandler.getTommorowsDate()
					 )
	}

	handleTabChange = (event, newValue) => {
		// console.log(dateHandler.reformatDateFromDisplayToApiFormat(event.currentTarget.textContent));
		this.setSelectedDay(dateHandler.reformatDateFromDisplayToApiFormat(event.currentTarget.textContent));
		this.setSelectedTabNumber(newValue);
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
					<WeatherForecastTimes city={this.props.value} day={this.state.selectedDay} />
				</div>
			</div>
		);
	}

}

export default WeatherComponent;
