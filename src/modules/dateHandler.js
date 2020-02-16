import moment from 'moment';

const _getTommorowsWeekday = () => {
	return moment(moment().add('1', 'day')).format('dddd') + ' ';
};

const _getTwoDaysAfterTodaysWeekday = () => {
	return moment(moment().add('2', 'day')).format('dddd');
};

const _getThreeDaysAfterTodaysWeekday = () => {
	return moment(moment().add('3', 'day')).format('dddd');
};

const _getFourDaysAfterTodaysWeekday = () => {
	return moment(moment().add('4', 'day')).format('dddd');
};

export default class DateHandler {

	dateDisplayFormat = 'DD/MM/YYYY'
	apiDateFormat = 'YYYY-MM-DD'

	getTommorowsDate = () => {
		return _getTommorowsWeekday() + '\n' + moment(moment().add('1', 'day')).format(this.dateDisplayFormat);
	}

	getTwoDaysAfterTodaysDate = () => {
		return _getTwoDaysAfterTodaysWeekday() + '\n' + moment(moment().add('2', 'day')).format(this.dateDisplayFormat);
	}

	getThreeDaysAfterTodaysDate = () => {
		return _getThreeDaysAfterTodaysWeekday() + '\n' + moment(moment().add('3', 'day')).format(this.dateDisplayFormat);
	}

	getFourDaysAfterTodaysDate = () => {
		return _getFourDaysAfterTodaysWeekday() + '\n' + moment(moment().add('4', 'day')).format(this.dateDisplayFormat);
	}

	reformatDate = {
		fromDisplayToApiFormat: date => {
			return moment(date, this.dateDisplayFormat).format(this.apiDateFormat);
		}
	}
}
