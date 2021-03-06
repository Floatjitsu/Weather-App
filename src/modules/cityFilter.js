import cities from '../data/cities';
import crossfilter from 'crossfilter2';
import alphabetRepresentations from '../data/letterRepresentations';

const maxFilterResults = 25;

const alphabetArray = alphabetRepresentations.alphabet;

const citiesFilter = crossfilter(cities);
const cityNameDimension = citiesFilter.dimension((city) => {
	return decodeURI(city.name) || '';
});

const hasRepresentations = checkedCharacter => {
	for (const letterObject of alphabetArray) {
		if (letterObject.letter === checkedCharacter) {
			return true;
		}
	}
	return false;
};

/* Returns an array of character representations if there are any */
const getRepresentations = representedCharacter => {
	const filteredArrayByRepresentedCharacter =
		alphabetArray.filter(letter => letter.letter === representedCharacter);
	return filteredArrayByRepresentedCharacter[0].representations;
};

const getCitiesStartsWithValue = value => {
	if (hasRepresentations(value.charAt(0))) {
		return getCitiesStartsWithValueWithRepresentation(value);
	}
	return getCitiesStartsWithValueWithoutRepresentation(value);
};

const getCitiesStartsWithValueWithRepresentation = value => {
	const representationsOfValue = getRepresentations(value.charAt(0));
	let searchValuesWithRepresentations = [];
	for (const letter of representationsOfValue) {
		searchValuesWithRepresentations.push(letter + value.substr(1));
	}
	return cityNameDimension.filter(city => {
		return city.startsWith(value) || city.startsWith(...searchValuesWithRepresentations);
	}).top(maxFilterResults);
}

const getCitiesStartsWithValueWithoutRepresentation = value => {
	return cityNameDimension.filter(city => {
		return city.startsWith(value);
	}).top(maxFilterResults);
};


export { getCitiesStartsWithValue };
