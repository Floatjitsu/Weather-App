const capitalizeSentence = sentence => {
	return sentence.toLowerCase()
		.split(' ')
		.map(s => s.charAt(0).toUpperCase() + s.substr(1))
		.join(' ');
};

const convertNumberToOneDecimal = number => {
	return number.toFixed(1);
};

export default {capitalizeSentence, convertNumberToOneDecimal};
