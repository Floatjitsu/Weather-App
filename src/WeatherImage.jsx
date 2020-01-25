import React from 'react';
import RainyImage from './weatherImages/rainy.svg';
import SunnyImage from './weatherImages/sun.svg';
import SnowImage from './weatherImages/snow.svg';
import CloudyImage from './weatherImages/cloudy.svg';
import FoggyImage from './weatherImages/foggy.svg';
import MistImage from './weatherImages/mist.svg';
import DrizzleImage from './weatherImages/drizzle.svg';
import ClearNightImage from './weatherImages/clear-night.svg';

export default class WeatherImage extends React.Component {

	render() {
		switch (this.props.value) {
			case 'Rain':
				return (
					<img src={RainyImage}
						 style={this.props.imageStyle}
						 alt={this.props.value} />
				 );
			case 'Clear':
				return (
					<img src={SunnyImage}
						 style={this.props.imageStyle}
						 alt={this.props.value} />
				 );
			case 'Snow':
				return (
					<img src={SnowImage}
						 style={this.props.imageStyle}
						 alt={this.props.value} />
				);
			case 'Clouds':
				return (
					<img src={CloudyImage}
						 style={this.props.imageStyle}
						 alt={this.props.value} />
				);
			case 'Fog':
				return (
					<img src={FoggyImage}
						 style={this.props.imageStyle}
						 alt={this.props.value} />
				);
			case 'Mist':
				return (
					<img src={MistImage}
						 style={this.props.imageStyle}
						 alt={this.props.value} />
				);
			case 'Drizzle':
				return (
					<img src={DrizzleImage}
						 style={this.props.imageStyle}
						 alt={this.props.value} />
				);
			case 'Clear Night':
				return (
					<img src={ClearNightImage}
						 style={this.props.imageStyle}
						 alt={this.props.value} />
				);
			default:
				return (
				 	<div>
				 		<p>{this.props.value}</p>
				 	</div>
				);
		}

	}
}
