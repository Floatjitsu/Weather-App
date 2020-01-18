import React from 'react';
import RainyImage from './weatherImages/rainy.svg';
import SunnyImage from './weatherImages/sun.svg';
import SnowImage from './weatherImages/snow.svg';
import CloudyImage from './weatherImages/cloudy.svg';

const imageStyle = {height: 100, width: 100};

export default class WeatherImage extends React.Component {
	render() {
		switch (this.props.value) {
			case 'Rain':
				return (
					<img src={RainyImage}
						 style={imageStyle}
						 alt={this.props.value} />
				 );
			case 'Clear':
				return (
					<img src={SunnyImage}
						 style={imageStyle}
						 alt={this.props.value} />
				 );
			case 'Snow':
				return (
					<img src={SnowImage}
						 style={imageStyle}
						 alt={this.props.value} />
				);
			case 'Clouds':
				return (
					<img src={CloudyImage}
						 style={imageStyle}
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
