import React from 'react';

class WeatherComponent extends React.Component {

	render() {
		return (
			<div className='weatherComponent'>
				<p>{this.props.value}</p>
			</div>
		);
	}
}

export default WeatherComponent;
