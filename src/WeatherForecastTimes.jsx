import React from 'react';
import {List, ListItem, Divider, ListItemText} from '@material-ui/core';

class WeatherForecastTimes extends React.Component {
	state = {

	}

	componentDidMount = () => {

	}

	render() {
		return (
			<List>
				<ListItem>
					<ListItemText primary={this.props.forecastList.threeAm} />
				</ListItem>
				<Divider />
				<ListItem>
					<ListItemText primary={this.props.forecastList.nineAm} />
				</ListItem>
				<Divider />
				<ListItem>
					<ListItemText primary={this.props.forecastList.threePm} />
				</ListItem>
				<Divider />
				<ListItem>
					<ListItemText primary={this.props.forecastList.ninePm} />
				</ListItem>
			</List>
		);
	}
}

export default WeatherForecastTimes;
