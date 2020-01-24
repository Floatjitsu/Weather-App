const capitalizeSentence = sentence => {
	return sentence.toLowerCase()
		.split(' ')
		.map(s => s.charAt(0).toUpperCase() + s.substr(1))
		.join(' ');
};

export default {capitalizeSentence};
