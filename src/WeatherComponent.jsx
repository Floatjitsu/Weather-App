import React from 'react';
import Fade from '@material-ui/core/Fade';
import weatherData from './weatherData';
import SentimentDissatisfiedRoundedIcon from '@material-ui/icons/SentimentDissatisfiedRounded';

class WeatherComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedCity: this.props.value,
			error: 'TestError',
			temperatureNow: '35 °C'
		}
	}

	componentDidUpdate = (prevProps) => {
		if (this.props.value !== prevProps.value) {
			this.setTemperatureForCurrentCity().then()
				.catch(error => {
					console.log(error);
					this.setState({
						error: error
					});
				});
		}
	}

	componentDidMount = () => {
		this.setTemperatureForCurrentCity().then()
			.catch(error => {
				this.setState({
					error: error
				});
			});
	}

	setTemperatureForCurrentCity = () => {
		return new Promise((resolve, reject) => {
			weatherData(this.props.value).then(result => {
				this.setState({
					temperatureNow: result.toFixed(1) + ' °C'
				});
				resolve();
			}).catch(error => {
				reject(error);
			});
		});
	}

	render() {
		return (
			<div className='weatherComponentContainer'>
				{this.state.error &&
					<div className='errorBox'>
						<SentimentDissatisfiedRoundedIcon />
						<div style={{marginLeft: 10}}>
							{this.state.error}
						</div>
					</div>
				}
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
