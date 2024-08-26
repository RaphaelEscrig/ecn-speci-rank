/** FORMS */
import { SpecialtiesBlankRoundsForm } from "../specialties-blank-rounds.form";
/** MODELS */
import type { SpecialtyBlankRound } from "@/modules/specialties/core/domain/models";

const emptyInitialState: SpecialtyBlankRound.Form = {
	rank: "",
	round: "",
};
const completedState: SpecialtyBlankRound.Form = {
	rank: "1 289",
	round: "1",
};

describe("Specialties listing form", () => {
	const form = new SpecialtiesBlankRoundsForm();

	it.each([
		{
			key: "round" as keyof SpecialtyBlankRound.Form,
			value: "1",
		},
		{
			key: "rank" as keyof SpecialtyBlankRound.Form,
			value: "1 289",
		},
		{
			key: "rank" as keyof SpecialtyBlankRound.Form,
			value: "47",
		},
	])("should change the form when $key is $value", ({ key, value }) => {
		const state = form.update(emptyInitialState, key, value);

		expect(state[key]).toBe(value);
	});

	it.each([
		{
			key: "rank" as keyof SpecialtyBlankRound.Form,
			value: "not a number",
			context: "is not a number",
			expected: "INVALID_RANK",
		},
		{
			key: "rank" as keyof SpecialtyBlankRound.Form,
			value: "",
			context: "is not a number",
			expected: "INVALID_RANK",
		},
		{
			key: "round" as keyof SpecialtyBlankRound.Form,
			value: "99",
			context: "is not in the range",
			expected: "INVALID_ROUND",
		},
		{
			key: "round" as keyof SpecialtyBlankRound.Form,
			value: "0",
			context: "is not in the range",
			expected: "INVALID_ROUND",
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
		},
		{
			rank: "8 384",
			round: "1",
		},
	])("should be valid", ({ rank, round }) => {
		const [isValid, errors] = form.validate({
			rank,
			round,
		});

		expect(isValid).toBeTruthy();
		expect(errors).toEqual({
			rank: null,
			round: null,
		});
	});
});
