import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import DevPic from '../images/dev-avatar.jpg';

export default class AboutComponent extends React.Component {

	render() {
		return (
			<div className='aboutList'>
				<ul style={{listStyleType:'none', display: 'table', margin: 0}}>
					<li className='aboutListItem'>
						<div style={{fontSize: 20}}> Creator </div>
					</li>
					<hr className='aboutListDivider'/>
					<li className='aboutListItem'>
						<Avatar src={DevPic} alt='Timur Celik'/>
						<div style={{marginLeft: 10}}> Timur Celik </div>
					</li>
				</ul>
			</div>
		);
	}
};
