import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import WeatherComponent from './WeatherComponent';
import SearchBar from './SearchBar';

class App extends React.Component {
	state = {
		city: ''
	}

	onSearchButtonClick = value => {
		this.setState({city: value});
	}

	render() {
		return (
			this.state.city === '' ?
				<div className='app'>
					<SearchBar
						onSearch={this.onSearchButtonClick.bind(this)}/>
				</div>
				:
				<div className='app'>
					<SearchBar
						onSearch={this.onSearchButtonClick.bind(this)}/>
					<WeatherComponent value={this.state.city}/>
				</div>
		);
	}
}

const Footer = () => (
	<footer className='footer'>
		<p>
			Weather Data provided by &nbsp;
			<a href='https://openweathermap.org/'>OpenWeather.org</a>
		</p>
	</footer>
);

ReactDOM.render(
  [<App />, <Footer />],
  document.getElementById('root')
);
