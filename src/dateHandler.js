import moment from 'moment';

class DateHandler {

	dateDisplayFormat = 'DD/MM/YYYY'
	apiDateFormat = 'YYYY-MM-DD'

	getTommorowsDate = () => {
		return moment(moment().add('1', 'day')).format(this.dateDisplayFormat);
	}

	getTwoDaysAfterTodaysDate = () => {
		return moment(moment().add('2', 'day')).format(this.dateDisplayFormat);
	}

	getThreeDaysAfterTodaysDate = () => {
		return moment(moment().add('3', 'day')).format(this.dateDisplayFormat);
	}

	getFourDaysAfterTodaysDate = () => {
		return moment(moment().add('4', 'day')).format(this.dateDisplayFormat);
	}

	reformatDateFromDisplayToApiFormat = date => {
		return moment(date, this.dateDisplayFormat).format(this.apiDateFormat);
	}
}

export default DateHandler;
