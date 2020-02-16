import React from 'react';
import {List, ListItem, Divider, ListItemText} from '@material-ui/core';
import WeatherImage from './WeatherImage';

function ForecastListItem(props) {
	return (Object.keys(props.value).length === 0 ?
		null :
		<div>
			<ListItem key={'threeAm'}>
				<div style={{marginRight: 15}}>
					{props.value.time}
				</div>
				<div style={{marginRight: 15}}>
					<WeatherImage
						value={props.value.weatherMain}
						imageStyle={{height: 35, width: 35}} />
				</div>
				<ListItemText
					primary={props.value.temperature}
					secondary={props.value.description} />
			</ListItem>
			<Divider />
		</div>
	);

}

class WeatherForecastTimes extends React.Component {
	render() {
		return (
			<List>
				<ForecastListItem value={this.props.forecastList.threeAm}/>
				<ForecastListItem value={this.props.forecastList.nineAm}/>
				<ForecastListItem value={this.props.forecastList.threePm}/>
				<ForecastListItem value={this.props.forecastList.ninePm}/>
			</List>
		);
	}
}

export default WeatherForecastTimes;
