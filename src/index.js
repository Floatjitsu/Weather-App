import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import './index.css';
import WeatherComponent from './components/WeatherComponent';
import SearchBar from './components/SearchBar';
import AboutComponent from './components/AboutComponent';
import InfoIcon from '@material-ui/icons/Info';
import HomeIcon from '@material-ui/icons/Home';

// console.log(process.env.REACT_APP_KEY);

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
			<Route path='/about' component={AboutComponent} />
		</div>
		<footer className='footer'>
			<p>
				<Link to='/'>
					<HomeIcon color='default' />
				</Link>
				<Link to='/about'>
					<InfoIcon color='default' />
				 </Link>
			 </p>
		</footer>
	</Router>
);

ReactDOM.render(
  [<Routing />],
  document.getElementById('root')
);
