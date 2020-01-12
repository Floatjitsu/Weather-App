import React from 'react';
import searchLogo from './search.svg';
import AutocompleteCity from './AutocompleteCity';

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
