import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import searchLogo from './search.svg'
import crossfilter from 'crossfilter2';
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
				<div className='searchBar'>
					<Autocomplete
						id='autocomplete-city'
						onInputChange={this.onInputChange.bind(this)}
						options={this.state.cityAutocompleteOptions}
						renderInput={params => (
							<TextField {...params} label='City' variant='outlined' fullWidth />
						)}
					/>
				</div>
			);
		} else {
			return (
				<div className='searchBar'>
					<Autocomplete
						id='autocomplete-city'
						onInputChange={this.onInputChange.bind(this)}
						options={this.state.cityAutocompleteOptions}
						value={this.state.selectedCity}
						renderInput={params => (
							<TextField {...params} label='City' variant='outlined' fullWidth />
						)}
					/>
				</div>
			);
		}

	}
}

export default AutocompleteCity;
