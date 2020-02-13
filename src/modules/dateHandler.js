import moment from 'moment';

export default class DateHandler {

	dateDisplayFormat = 'DD/MM/YYYY'
	apiDateFormat = 'YYYY-MM-DD'

	getTommorowsDate = () => {
		return 'Sunday \n' + moment(moment().add('1', 'day')).format(this.dateDisplayFormat);
	}

	getTwoDaysAfterTodaysDate = () => {
		return 'Monday \n' + moment(moment().add('2', 'day')).format(this.dateDisplayFormat);
	}

	getThreeDaysAfterTodaysDate = () => {
		return 'Tuesday \n' + moment(moment().add('3', 'day')).format(this.dateDisplayFormat);
	}

	getFourDaysAfterTodaysDate = () => {
		return 'Wednesday \n' + moment(moment().add('4', 'day')).format(this.dateDisplayFormat);
	}

	reformatDate = {
		fromDisplayToApiFormat: date => {
			return moment(date, this.dateDisplayFormat).format(this.apiDateFormat);
		}
	}
}
