import React from 'react';
import AutocompleteCity from './AutocompleteCity';
import WeatherComponent from './WeatherComponent';
import crossfilter from 'crossfilter2';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import SearchIcon from '@material-ui/icons/Search';
import cities from './cities.json';

const citiesFilter = crossfilter(cities);
const cityNameDimension = citiesFilter.dimension((city) => {
	return decodeURI(city.name) || '';
});

class SearchBar extends React.Component {
	constructor(props){
		super(props);
	}

	onInputChange = (event, value, reason) => {
		this.clearAutocompleteOptions(['Type in city...']);
		const cityFilter = this.getCitiesStartsWithValue(value);
		this.setState({
			selectedCity: value,
			autoCompleteOptions: this.getAutocompleteCitiesInOutputFormat(cityFilter)
		});
	}

	state = {
		autoCompleteOptions: ['Type in city...']
	}

	setAutocompleteOptions = (newAutoCompleteOptions) => {
		this.setState({autoCompleteOptions: newAutoCompleteOptions});
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

	onSearchTest() {
		console.log('ON SEARCH TEST');
		this.props.onSearch('HELLO');
	}

	render() {
		return (
			<div className='searchContainer'>
				<div className='autoComplete'>
				<AutocompleteCity
					inputValue={this.state.city}
					inputChange={this.onInputChange}
					autoCompleteOptions={this.state.autoCompleteOptions} />
				</div>
				<div className='searchLogo'>
					<Fab color="primary" aria-label="add" onClick={this.onSearchTest.bind(this)}>
						<SearchIcon />
					</Fab>
				</div>
			</div>
		);
	}
}

export default SearchBar;
