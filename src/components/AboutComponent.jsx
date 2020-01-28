import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import EmailIcon from '@material-ui/icons/Email';
import GitHubIcon from '@material-ui/icons/GitHub';
import DevPic from '../images/dev-avatar.jpg';
import OpenWeatherLogo from '../images/open-weather-logo.jpg';

export default class AboutComponent extends React.Component {

	render() {
		return (
			<div className='aboutList'>
				<ul style={{listStyleType:'none', display: 'table', margin: 0}}>
					<li className='aboutListItem'>
						<div style={{fontSize: 20}}> Creator </div>
					</li>
					<hr className='aboutListDivider' />
					<li className='aboutListItem'>
						<Avatar src={DevPic} alt='Timur Celik'/>
						<div style={{marginLeft: 10}}> Timur Celik </div>
					</li>
					<li className='aboutListItem'>
						<div style={{fontSize: 20, marginTop: 20}}> Contact </div>
					</li>
					<hr className='aboutListDivider' />
					<li className='aboutListItem'>
						<GitHubIcon />
						<div style={{marginLeft: 10}}>
							 <a href='https://github.com/Floatjitsu'>
								 Floatjitsu
						 	 </a>
						 </div>
					</li>
					<li className='aboutListItem'>
						<EmailIcon />
						<div style={{marginLeft: 10}}> timur.celik@gmx.de </div>
					</li>
					<li className='aboutListItem'>
						<div style={{fontSize: 20, marginTop: 20}}> Weather Data </div>
					</li>
					<hr className='aboutListDivider' />
					<li className='aboutListItem'>
						<a href='https://openweathermap.org/'>
							<img src={OpenWeatherLogo} width='150' height='70' alt='Open Weather'/>
						</a>
					</li>
				</ul>
			</div>
		);
	}
};
