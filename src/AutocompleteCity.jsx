import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import crossfilter from 'crossfilter2';
const cities = require('./cities.json');
const request = require('request');

const citiesFilter = crossfilter(cities);
const cityNameDimension = citiesFilter.dimension((city) => {
	return city.name || '';
});

const getCurrentCityOfUser = new Promise((resolve, reject) => {
	request('https://freegeoip.app/json/', (error, response, body) => {
		if (!error) {
			resolve(JSON.parse(body).city);
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
			cities: ['TestCity1', 'TestCity2']
		}
	}

	onTagsChange(event, value, reason) {
		//this.state.cities.push('X');
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
						onInputChange={this.onTagsChange.bind(this)}
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
						onInputChange={this.onTagsChange.bind(this)}
						options={this.state.cities}
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
