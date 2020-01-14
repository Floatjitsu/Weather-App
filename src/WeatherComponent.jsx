import React from 'react';

class WeatherComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: 42
		}
	}

	changeValue = () => {
		this.setState({
			value: 35
		});
	}

	render() {
		return (
			<div>
				<p>{this.props.value}</p>
			</div>
		);
	}
}

export default WeatherComponent;
