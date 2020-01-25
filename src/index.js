import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import WeatherComponent from './WeatherComponent';
import SearchBar from './SearchBar';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			city: ''
		}
	}

	onSearchButtonClick(value) {
		this.setState({city: value});
	}

	render() {
		if (this.state.city === '') {
			return (
				<div className='app'>
					<SearchBar
						onSearch={this.onSearchButtonClick.bind(this)}/>
				</div>
			);
		} else {
			return (
				<div className='app'>
					<SearchBar
						onSearch={this.onSearchButtonClick.bind(this)}/>
					<WeatherComponent value={this.state.city}/>
				</div>
			);
		}
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
