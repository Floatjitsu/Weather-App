import cities from './cities.json';
import crossfilter from 'crossfilter2';
import alphabetRepresentations from './letterRepresentations.json';

const alphabetArray = alphabetRepresentations.alphabet;

const hasRepresentations = checkedCharacter => {
	for (const letterObject of alphabetArray) {
		if (letterObject.letter === checkedCharacter) {
			return true;
		}
	}
	return false;
};

/* Returns an array of character representations if there are some */
const getRepresentations = representedCharacter => {
	if (hasRepresentations(representedCharacter)) {
		let filteredArrayByRepresentedCharacter =
			alphabetArray.filter(letter => letter.letter === representedCharacter);
		return filteredArrayByRepresentedCharacter[0].representations;
	} else {
		return [];
	}
}


export { getRepresentations };
