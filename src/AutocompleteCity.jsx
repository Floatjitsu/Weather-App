import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import request from 'request';

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

class AutocompleteCity extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			cityOfUser: ''
		}
	}

	componentDidMount() {
		getCurrentCityOfUser.then(result => {
			this._asyncRequest = null;
			this.setState({
				cityOfUser: result
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

	render() {
		if (this.state.cityOfUser === null) {
			return (
				<Autocomplete
					id='autocomplete-city'
					onInputChange={this.props.inputChange.bind(this)}
					options={this.props.autoCompleteOptions}
					value={this.state.cityOfUser}
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
					renderInput={params => (
						<TextField {...params} label='City' variant='outlined' fullWidth/>
					)}
				/>
			);
		}
	}
}

export default AutocompleteCity;
