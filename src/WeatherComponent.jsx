import React from 'react';
import Fade from '@material-ui/core/Fade';
import weatherData from './weatherData';

class WeatherComponent extends React.Component {
	state = {
		temperatureNow: '35 °C'
	}

	componentDidUpdate = () => {
		this.setTemperatureForCurrentCity();
	}

	componentDidMount = () => {
		this.setTemperatureForCurrentCity();
	}

	setTemperatureForCurrentCity = () => {
		weatherData(this.props.value).then(result => {
			this.setState({
				temperatureNow: result.toFixed(1) + ' °C'
			});
		}).catch(error => {
			console.log(error);
		})
	}

	render() {
		return (
			<div className='weatherComponentContainer'>
				<div className='weatherComponentCity'>
					<Fade in={true} timeout={900}>
						<p>{this.props.value}</p>
					</Fade>
				</div>
				<div className='weatherComponentDegree'>
					<p>{this.state.temperatureNow}</p>
				</div>
			</div>
		);
	}
}

export default WeatherComponent;
