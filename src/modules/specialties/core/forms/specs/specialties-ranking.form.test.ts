/** FORMS */
import { SpecialtiesRankingForm } from "@/modules/specialties/core/forms/specialties-ranking.form";
/** MODELS */
import type { SpecialtyRanking } from "@/modules/specialties/core/domain/models";

const emptyInitialState: SpecialtyRanking.Form = {
	specialty: "",
	year: "",
};
const completedState: SpecialtyRanking.Form = {
	specialty: "CMF",
	year: "2023",
};

describe("Specialties rank form", () => {
	const form = new SpecialtiesRankingForm();

	it.each([
		{
			key: "rank" as keyof SpecialtyRanking.Form,
			value: "1 289",
		},
		{
			key: "specialty" as keyof SpecialtyRanking.Form,
			value: "CMF",
		},
	])("should change the form when $key is $value", ({ key, value }) => {
		const state = form.update(emptyInitialState, key, value);

		expect(state[key]).toBe(value);
	});

	it.each([
		{
			key: "year" as keyof SpecialtyRanking.Form,
			value: "2024",
			context: "is not in the range",
			expected: "INVALID_YEAR",
		},
		{
			key: "specialty" as keyof SpecialtyRanking.Form,
			value: "NOT_VALID",
			context: "is not a specialty",
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
			year: "2023",
			specialty: "CMF",
		},
	])("should be valid", ({ year, specialty }) => {
		const [isValid, errors] = form.validate({
			year,
			specialty,
		});

		expect(isValid).toBeTruthy();
		expect(errors).toEqual({
			specialty: null,
			year: null,
		});
	});
});
