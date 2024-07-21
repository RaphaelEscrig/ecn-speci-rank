// /** FORMS */
import { CitiesRankForm } from "../cities-rank.form";
// /** MODELS */
import type { CityRank } from "@/modules/cities/core/domain/models";

const emptyInitialState: CityRank.Form = {
	rank: "",
	year: "",
	specialty: "",
};
const completedState: CityRank.Form = {
	rank: "1 289",
	year: "2023",
	specialty: "CMF",
};

describe("Cities rank form", () => {
	const form = new CitiesRankForm();

	it.each([
		{
			key: "year" as keyof CityRank.Form,
			value: "2023",
		},
		{
			key: "rank" as keyof CityRank.Form,
			value: "1 289",
		},
		{
			key: "rank" as keyof CityRank.Form,
			value: "47",
		},
		{
			key: "specialty" as keyof CityRank.Form,
			value: "CMF",
		},
		{
			key: "specialty" as keyof CityRank.Form,
			value: "",
		},
	])("should change the form when $key is $value", ({ key, value }) => {
		const state = form.update(emptyInitialState, key, value);

		expect(state[key]).toBe(value);
	});

	it.each([
		{
			key: "rank" as keyof CityRank.Form,
			value: "",
			context: "is empty",
			expected: "INVALID_RANK",
		},
		{
			key: "rank" as keyof CityRank.Form,
			value: "not a number",
			context: "is not a number",
			expected: "INVALID_RANK",
		},
		{
			key: "year" as keyof CityRank.Form,
			value: "2024",
			context: "is not in the range",
			expected: "INVALID_YEAR",
		},
		{
			key: "year" as keyof CityRank.Form,
			value: "2018",
			context: "is not in the range",
			expected: "INVALID_YEAR",
		},
		{
			key: "specialty" as keyof CityRank.Form,
			value: "",
			context: "is empty",
			expected: "INVALID_SPECIALTY",
		},
		{
			key: "specialty" as keyof CityRank.Form,
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
			year: "2023",
			specialty: "CMF",
		},
		{
			rank: "8 384",
			year: "2021",
			specialty: "CMF",
		},
	])("should be valid", ({ rank, year, specialty }) => {
		const [isValid, errors] = form.validate({
			rank,
			year,
			specialty,
		});

		expect(isValid).toBeTruthy();
		expect(errors).toEqual({
			rank: null,
			year: null,
			specialty: null,
		});
	});
});
