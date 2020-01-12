import React from 'react';
import searchLogo from './search.svg';
import AutocompleteCity from './AutocompleteCity';

class SearchBar extends React.Component {
	onSearch(event) {

	}

	render() {
		return (
			<div>
				<AutocompleteCity />
				<input
					type='image'
					src={searchLogo}
					className='searchLogo'
					alt='Search Logo'
					onClick={this.onSearch} />
			</div>
		);
	}
}

export default SearchBar;
