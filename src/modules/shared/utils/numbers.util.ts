const floatNumberWithSpaces = (number: number | string): string => {
	const parts = number.toString().split(".");

	parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
	return parts.join(".");
};

export const numberWithSpaces = (number: number | string): string => {
	number = number.toString().replace(/\s/g, "");

	if (number.toString().indexOf(".") !== -1) {
		return floatNumberWithSpaces(number);
	}
	return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};

export const numberWithoutSpaces = (numberToCast: string | number): number => {
	return castStringNumberToNumber(numberToCast.toString());
};

export const castStringNumberToNumber = (numberToCast: string): number => {
	let numberToReturn = 0;

	numberToCast = numberToCast.replace(/\s/g, "");

	if (numberToCast.indexOf(".") !== -1) {
		numberToReturn = parseFloat(numberToCast);
	} else {
		numberToReturn = parseInt(numberToCast);
	}

	if (Number.isNaN(numberToReturn)) {
		return 0;
	}
	return numberToReturn;
};
