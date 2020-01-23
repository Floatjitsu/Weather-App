import React from 'react';
import {List, ListItem, Divider, ListItemText} from '@material-ui/core';

class WeatherForecastTimes extends React.Component {
	state = {
		
	}

	render() {
		return (
			<List>
				<ListItem>
					<ListItemText primary={this.state.weatherTomorrow} />
				</ListItem>
				<Divider />
				<ListItem>
					<ListItemText primary={this.state.weatherTwoDays} />
				</ListItem>
				<ListItem>
					<ListItemText primary={this.state.weatherThreeDays} />
				</ListItem>
				<Divider />
				<ListItem>
					<ListItemText primary={this.state.weatherFourDays} />
				</ListItem>
			</List>
		);
	}
}

export default WeatherForecastTimes;
