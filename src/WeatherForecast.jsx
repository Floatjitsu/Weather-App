import React from 'react';
import {List, ListItem, Divider, ListItemText, AppBar, Tab, Tabs} from '@material-ui/core';
import DateHandler from './dateHandler.js';

const dateHandler = new DateHandler();

class WeatherComponent extends React.Component {
	render() {
		return (
			<AppBar position='static' color='primary'>
				<Tabs>
					<Tab label={dateHandler.getTommorowsDate()} />
					<Tab label={dateHandler.getTwoDaysAfterTodaysDate()} />
					<Tab label={dateHandler.getThreeDaysAfterTodaysDate()} />
					<Tab label={dateHandler.getFourDaysAfterTodaysDate()} />
				</Tabs>
			</AppBar>
		);
	}

}

export default WeatherComponent;
