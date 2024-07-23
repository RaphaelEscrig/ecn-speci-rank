// /** FORMS */
import { SpecialtiesForm } from "../specialties.form";
// /** MODELS */
import type { Specialty } from "@/modules/specialties/core/domain/models";

const emptyInitialState: Specialty.Form = {
	rank: "",
	year: "",
};
const completedState: Specialty.Form = {
	rank: "1 289",
	year: "2023",
};

describe("Cities rank form", () => {
	const form = new SpecialtiesForm();

	it.each([
		{
			key: "year" as keyof Specialty.Form,
			value: "2023",
		},
		{
			key: "rank" as keyof Specialty.Form,
			value: "1 289",
		},
		{
			key: "rank" as keyof Specialty.Form,
			value: "47",
		},
	])("should change the form when $key is $value", ({ key, value }) => {
		const state = form.update(emptyInitialState, key, value);

		expect(state[key]).toBe(value);
	});

	it.each([
		{
			key: "rank" as keyof Specialty.Form,
			value: "not a number",
			context: "is not a number",
			expected: "INVALID_RANK",
		},
		{
			key: "year" as keyof Specialty.Form,
			value: "2024",
			context: "is not in the range",
			expected: "INVALID_YEAR",
		},
		{
			key: "year" as keyof Specialty.Form,
			value: "2018",
			context: "is not in the range",
			expected: "INVALID_YEAR",
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
		},
		{
			rank: "",
			year: "2023",
		},
		{
			rank: "8 384",
			year: "2021",
		},
	])("should be valid", ({ rank, year }) => {
		const [isValid, errors] = form.validate({
			rank,
			year,
		});

		expect(isValid).toBeTruthy();
		expect(errors).toEqual({
			rank: null,
			year: null,
		});
	});
});
