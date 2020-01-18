import React from 'react';
import {List, ListItem, Divider, ListItemText} from '@material-ui/core';

class WeatherComponent extends React.Component {

	render() {
		return (
			<List>
				<ListItem alignItems='flex-start'>
					<ListItemText primary={'test'} />
				</ListItem>
				<Divider />
				<ListItem>
					<ListItemText primary={'test'} />
				</ListItem>
			</List>
		);
	}

}

export default WeatherComponent;
