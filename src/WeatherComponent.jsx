import React from 'react';
import Fade from '@material-ui/core/Fade';
import weatherData from './weatherData';
import SentimentDissatisfiedRoundedIcon from '@material-ui/icons/SentimentDissatisfiedRounded';
import WeatherImage from './WeatherImage';
import WeatherForecast from './WeatherForecast';

class WeatherComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			error: null
		}
	}

	componentDidUpdate = prevProps => {
		if (this.props.value !== prevProps.value) {
			this.setTemperatureForCurrentCity()
				.then(() => {
					this.setErrorState(null);
				})
				.catch(error => {
					this.setErrorState(error);
				});
		}
	}

	componentDidMount = () => {
		this.setTemperatureForCurrentCity().then()
			.catch(error => {
				this.setErrorState(error);
		});
	}

	setTemperatureForCurrentCity = () => {
		return new Promise((resolve, reject) => {
			weatherData.getCurrentWeatherForCity(this.props.value).then(result => {
				this.setTemperatureNowState(result.temperatureNow.toFixed(1) + ' C°');
				this.setWeatherState(result.weather);
				this.setWeatherDescriptionState(result.weatherDescription);
				resolve();
			}).catch(error => {
				reject(error);
			});
		});
	}

	setErrorState = error => {
		this.setState({
			error: error
		});
	}

	setWeatherState = weather => {
		this.setState({
			weather: weather
		});
	}

	setTemperatureNowState = temperature => {
		this.setState({
			temperatureNow: temperature
		});
	}

	setWeatherDescriptionState = weatherDescription => {
		this.setState({
			weatherDescription: this.capitalizeWeatherDescription(weatherDescription)
		});
	}

	/* API delivers weather description in no capitalized form */
	capitalizeWeatherDescription = weatherDescription => {
		return weatherDescription.toLowerCase()
			.split(' ')
			.map(s => s.charAt(0).toUpperCase() + s.substr(1))
			.join(' ');
	}

	render() {
		if (this.state.error !== null) {
			return (
				<div className='weatherComponentContainer'>
					<div className='errorBox'>
						<SentimentDissatisfiedRoundedIcon />
						<div style={{marginLeft: 10}}>
							{this.state.error}
						</div>
					</div>
				</div>
			);
		}
		return (
			<div className='weatherComponentContainer'>
				<div className='weatherComponentCity'>
					<Fade in={true} timeout={1100}>
						<p>{this.props.value}</p>
					</Fade>
				</div>
				<div className='weatherComponentDegree'>
					<Fade in={true} timeout={1300}>
						<p>{this.state.temperatureNow}</p>
					</Fade>
				</div>
				<div>
					<Fade in={true} timeout={1500}>
						<WeatherImage
							value={this.state.weather}
							imageStyle={{height: 100, width: 100}}/>
					</Fade>
				</div>
				<div className='weatherComponentWeatherDescription'>
					<Fade in={true} timeout={1700}>
						<p>{this.state.weatherDescription}</p>
					</Fade>
				</div>
				<div className='weatherComponentForecast'>
					<Fade in={true} timeout={1900}>
						<div> <WeatherForecast value={this.props.value}/> </div>
					</Fade>
				</div>
			</div>
		);
	}
}

export default WeatherComponent;
