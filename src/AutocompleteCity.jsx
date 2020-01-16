import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

class AutocompleteCity extends React.Component {
	render() {
		if (this.props.value == null) {
			return (
				<Autocomplete
					id='autocomplete-city'
					onInputChange={this.props.inputChange.bind(this)}
					options={this.props.autoCompleteOptions}
					value={null}
					renderInput={params => (
						<TextField {...params} label='City' variant='outlined' fullWidth/>
					)}
				/>
			);
		} else {
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
}

export default AutocompleteCity;
