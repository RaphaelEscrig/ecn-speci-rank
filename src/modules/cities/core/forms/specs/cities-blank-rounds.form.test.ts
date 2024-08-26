/** FORMS */
import { CitiesBlankRoundsForm } from "../cities-blank-rounds.form";
/** MODELS */
import type { CityBlankRound } from "@/modules/cities/core/domain/models";

const emptyInitialState: CityBlankRound.Form = {
	rank: "",
	round: "",
	specialty: "",
};
const completedState: CityBlankRound.Form = {
	rank: "1 289",
	round: "1",
	specialty: "CMF",
};

describe("Cities rank form", () => {
	const form = new CitiesBlankRoundsForm();

	it.each([
		{
			key: "round" as keyof CityBlankRound.Form,
			value: "1",
		},
		{
			key: "rank" as keyof CityBlankRound.Form,
			value: "1 289",
		},
		{
			key: "rank" as keyof CityBlankRound.Form,
			value: "47",
		},
		{
			key: "specialty" as keyof CityBlankRound.Form,
			value: "CMF",
		},
		{
			key: "specialty" as keyof CityBlankRound.Form,
			value: "",
		},
	])("should change the form when $key is $value", ({ key, value }) => {
		const state = form.update(emptyInitialState, key, value);

		expect(state[key]).toBe(value);
	});

	it.each([
		{
			key: "rank" as keyof CityBlankRound.Form,
			value: "",
			context: "is empty",
			expected: "INVALID_RANK",
		},
		{
			key: "rank" as keyof CityBlankRound.Form,
			value: "not a number",
			context: "is not a number",
			expected: "INVALID_RANK",
		},
		{
			key: "round" as keyof CityBlankRound.Form,
			value: "99",
			context: "is not in the range",
			expected: "INVALID_ROUND",
		},
		{
			key: "round" as keyof CityBlankRound.Form,
			value: "0",
			context: "is not in the range",
			expected: "INVALID_ROUND",
		},
		{
			key: "specialty" as keyof CityBlankRound.Form,
			value: "",
			context: "is empty",
			expected: "INVALID_SPECIALTY",
		},
		{
			key: "specialty" as keyof CityBlankRound.Form,
			value: "CMFIJ",
			context: "does not exist",
			expected: "INVALID_SPECIALTY",
		},
	])(
		"should not be submittable when $key $context",
		({ key, value, context, expected }) => {
			const [isValid, errors] = form.validate({
				...completedState,
				[key]: value,
			});

			expect(isValid).toBeFalsy();
			expect(errors[key]).toBe(expected);
		}
	);

	it.each([
		{
			rank: "100",
			round: "1",
			specialty: "CMF",
		},
		{
			rank: "8 384",
			round: "1",
			specialty: "CMF",
		},
	])("should be valid", ({ rank, round, specialty }) => {
		const [isValid, errors] = form.validate({
			rank,
			round,
			specialty,
		});

		expect(isValid).toBeTruthy();
		expect(errors).toEqual({
			rank: null,
			round: null,
			specialty: null,
		});
	});
});
