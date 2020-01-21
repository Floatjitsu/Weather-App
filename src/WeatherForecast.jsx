import React from 'react';
import {List, ListItem, Divider, ListItemText, AppBar, Tab, Tabs} from '@material-ui/core';

class WeatherComponent extends React.Component {

	render() {
		return (
			<AppBar position='static' color='default'>
				<Tabs>
					<Tab label='Date One' />
					<Tab label='Date Two' />
					<Tab label='Date Three' />
					<Tab label='Date Four' />
					<Tab label='Date Five' />
				</Tabs>
			</AppBar>
		);
	}

}

export default WeatherComponent;
