import React from 'react';
import AutocompleteCity from './AutocompleteCity';
import Fab from '@material-ui/core/Fab';
import SearchIcon from '@material-ui/icons/Search';
import request from 'request';
import {getCitiesStartsWithValue} from './cityFilter.js';

const getCurrentCityOfUser = new Promise((resolve, reject) => {
	request('https://freegeoip.app/json/', (error, response, body) => {
		if (!error) {
			const result = JSON.parse(body);
			if (result.city) {
				resolve(result.city + ', ' + result.region_name + ', ' + result.country_name);
			} else {
				reject('Could not detect city!');
			}
		} else {
			reject(error);
		}
	});
});

class SearchBar extends React.Component {
	componentDidMount() {
		getCurrentCityOfUser.then(result => {
			this._asyncRequest = null;
			this.setState({
				selectedCity: result
			});
		}).catch(err => {
			console.log(err);
		});
	}

	componentWillUnmount() {
	    if (this._asyncRequest) {
	      this._asyncRequest.cancel();
	    }
  	}

	onInputChange = (event, value, reason) => {
		this.setAutocompleteOptions(['Type in city...']);
		this.setSelectedCity('');
		if (value.length > 0) {
			const cityFilter = getCitiesStartsWithValue(this.capitalizeString(value));
			this.setSelectedCity(value);
			this.setAutocompleteOptions(this.getAutocompleteCitiesInOutputFormat(cityFilter));
		}
	}

	capitalizeString = (stringToCapitalize) => {
		return stringToCapitalize.charAt(0).toUpperCase() + stringToCapitalize.slice(1);
	}

	state = {
		autoCompleteOptions: ['Type in city...']
	}

	setAutocompleteOptions = (newAutoCompleteOptions) => {
		this.setState({autoCompleteOptions: newAutoCompleteOptions});
	}

	setSelectedCity = value => {
		this.setState({
			selectedCity: value
		});
	}

	// Output format for the Autocomplete: 'City', 'Subcountry', 'Country'
	// Example: London, England, United Kingdom
	getAutocompleteCitiesInOutputFormat(cities) {
		return cities.map(cityObject => {
			return cityObject.name + ', ' + cityObject.subcountry + ', ' + cityObject.country;
		});
	}

	onSearchButtonClick() {
		this.props.onSearch(this.state.selectedCity);
	}

	render() {
		if (this.state.selectedCity === null) {
			return (
				<div className='searchContainer'>
					<div className='autoComplete'>
					<AutocompleteCity
						inputChange={this.onInputChange}
						autoCompleteOptions={this.state.autoCompleteOptions} />
					</div>
					<div className='searchLogo'>
						<Fab color="primary" aria-label="add" onClick={this.onSearchButtonClick.bind(this)}>
							<SearchIcon />
						</Fab>
					</div>
				</div>
			);

		} else {
			return (
				<div className='searchContainer'>
					<div className='autoComplete'>
					<AutocompleteCity
						value={this.state.selectedCity}
						inputChange={this.onInputChange}
						autoCompleteOptions={this.state.autoCompleteOptions} />
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

export default SearchBar;
