import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import crossfilter from 'crossfilter2';
import Fab from '@material-ui/core/Fab';
import SearchIcon from '@material-ui/icons/Search';
import searchLogo from './search.svg';
import WeatherComponent from './WeatherComponent'
const cities = require('./cities.json');
const request = require('request');

const citiesFilter = crossfilter(cities);
const cityNameDimension = citiesFilter.dimension((city) => {
	return decodeURI(city.name) || '';
});

const getCurrentCityOfUser = new Promise((resolve, reject) => {
	request('https://freegeoip.app/json/', (error, response, body) => {
		if (!error) {
			const result = JSON.parse(body);
			resolve(result.city + ', ' + result.region_name + ', ' + result.country_name);
		} else {
			reject(error);
		}
	});
});

class AutocompleteCity extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedCity: '',
			cityAutocompleteOptions: ['Type in city...']
		}
	}

	clearAutocompleteOptions() {
		this.setState({
			cityAutocompleteOptions: []
		});
	}

	getCitiesStartsWithValue(value) {
		return cityNameDimension.filter((city) => {
			return city.startsWith(value);
		}).top(20);
	}

	// Output format for the Autocomplete: 'City', 'Subcountry', 'Country'
	// Example: London, England, United Kingdom
	getAutocompleteCitiesInOutputFormat(cities) {
		return cities.map(cityObject => {
			return cityObject.name + ', ' + cityObject.subcountry + ', ' + cityObject.country;
		});
	}

	onInputChange(event, value, reason) {
		this.clearAutocompleteOptions();
		const cityFilter = this.getCitiesStartsWithValue(value);
		this.setState({
			selectedCity: value,
			cityAutocompleteOptions: this.getAutocompleteCitiesInOutputFormat(cityFilter)
		});
	}

	onSearchButtonClick(event) {
		const cityName = this.state.selectedCity.split(',')[0];
		return (
			<WeatherComponent value={cityName} />
		);
	}

	componentDidMount() {
		getCurrentCityOfUser.then(result => {
			this._asyncRequest = null;
			this.setState({selectedCity: result});
		});
	}

	componentWillUnmount() {
	    if (this._asyncRequest) {
	      this._asyncRequest.cancel();
	    }
  	}

	render() {
		if (this.state.selectedCity === null) {
			return (
				<div className='autoCompleteContainer'>
					<Autocomplete
						id='autocomplete-city'
						onInputChange={this.onInputChange.bind(this)}
						options={this.state.cityAutocompleteOptions}
						renderInput={params => (
							<TextField {...params} label='City' variant='outlined' fullWidth />
						)}
					/>
					<Fab color="primary" aria-label="add">
						<SearchIcon />
				    </Fab>
				</div>
			);
		} else {
			return (
				<div className='autoCompleteContainer'>
					<div className='autoComplete'>
						<Autocomplete
							id='autocomplete-city'
							onInputChange={this.onInputChange.bind(this)}
							options={this.state.cityAutocompleteOptions}
							value={this.state.selectedCity}
							renderInput={params => (
								<TextField {...params} label='City' variant='outlined' fullWidth/>
							)}
						/>
					</div>
					<div className='searchLogo'>
						<Fab color="primary" aria-label="add" onClick={this.onSearchButtonClick.bind(this)}>
							<SearchIcon />
						</Fab>
					</div>
				</div>
			);
		}
	}
}

export default AutocompleteCity;
