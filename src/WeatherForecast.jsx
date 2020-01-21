import React from 'react';
import {List, ListItem, Divider, ListItemText, AppBar, Tab, Tabs} from '@material-ui/core';
import DateHandler from './dateHandler.js';
import weatherData from './weatherData';
import moment from 'moment';

const dateHandler = new DateHandler();

class WeatherComponent extends React.Component {

	componentWillMount = () => {
		const tomorrow =
			dateHandler.reformatDateString(dateHandler.getTommorowsDate(), 'DD/MM/YYYY', 'YYYY-MM-DD');
		weatherData.loadWeatherForecastForCity(this.props.value).then(result => {
			const test = weatherData.getWeatherForecast(this.props.value, tomorrow);
			console.log(test);
		});
	}

	componentDidUpdate = () => {
		if (this.state.selectedTabNumber !== 0) {
			this.setSelectedTabNumber(0);
		}		
	}

	state = {
		selectedTabNumber: 0
	}

	handleTabChange = (event, newValue) => {
		console.log(dateHandler.reformatDateString(event.currentTarget.textContent, 'DD/MM/YYYY', 'YYYY-MM-DD'));
		this.setSelectedTabNumber(newValue);
	}

	setSelectedTabNumber = value => {
		this.setState({
			selectedTabNumber: value
		})
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
			</div>
		);
	}

}

export default WeatherComponent;
