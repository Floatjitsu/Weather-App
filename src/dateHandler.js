import moment from 'moment';

const dateFormat = 'DD/MM/YYYY';

class DateHandler {
	getTommorowsDate = () => {
		return moment(moment().add('1', 'day')).format(dateFormat);
	}

	getTwoDaysAfterTodaysDate = () => {
		return moment(moment().add('2', 'day')).format(dateFormat);
	}

	getThreeDaysAfterTodaysDate = () => {
		return moment(moment().add('3', 'day')).format(dateFormat);
	}

	getFourDaysAfterTodaysDate = () => {
		return moment(moment().add('4', 'day')).format(dateFormat);
	}
}

export default DateHandler;
