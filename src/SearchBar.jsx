import React from 'react';
import AutocompleteCity from './AutocompleteCity';
import WeatherComponent from './WeatherComponent';

class SearchBar extends React.Component {
	render() {
		return (
			<div>
				<AutocompleteCity />
			</div>
		);
	}
}

export default SearchBar;
