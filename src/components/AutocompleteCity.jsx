import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

class AutocompleteCity extends React.Component {
	render() {
		return (
			<Autocomplete
				id='autocomplete-city'
				onInputChange={this.props.inputChange.bind(this)}
				options={this.props.autoCompleteOptions}
				value={this.props.value}
				renderInput={params => (
					<TextField {...params} label='City' variant='outlined' fullWidth/>
				)}
			/>
		);
	}
}

export default AutocompleteCity;
