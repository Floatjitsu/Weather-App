import React from 'react';
import Fade from '@material-ui/core/Fade';

class WeatherComponent extends React.Component {
	render() {
		return (
			<div className='weatherComponentContainer'>
				<div className='weatherComponentCity'>
					<Fade in={true} timeout={900}>
						<p>{this.props.value}</p>
					</Fade>
				</div>
				<div className='weatherComponentDegree'>
					<p>35 °C</p>
				</div>
			</div>
		);
	}
}

export default WeatherComponent;
