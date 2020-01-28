import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import './index.css';
import WeatherComponent from './components/WeatherComponent';
import SearchBar from './components/SearchBar';

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
				<div>
					<SearchBar
						onSearch={this.onSearchButtonClick.bind(this)}/>
				</div>
				:
				<div>
					<SearchBar
						onSearch={this.onSearchButtonClick.bind(this)}/>
					<WeatherComponent value={this.state.city}/>
				</div>
		);
	}
}

const Routing = () => (
	<Router>
		<div className='app'>
			<Route exact path='/' component={App} />
		</div>
	</Router>
);

const Footer = () => (
	<footer className='footer'>
		<p>
			Weather Data provided by &nbsp;
			<a href='https://openweathermap.org/'>OpenWeather.org</a>
		</p>
	</footer>
);

ReactDOM.render(
  [<Routing />, <Footer />],
  document.getElementById('root')
);
