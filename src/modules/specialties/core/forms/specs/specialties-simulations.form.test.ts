/** FORMS */
import { SpecialtiesSimulationsForm } from "@/modules/specialties/core/forms/specialties-simulations.form";
/** MODELS */
import type { SpecialtySimulation } from "@/modules/specialties/core/domain/models";

const emptyInitialState: SpecialtySimulation.Form = {
	rank: "",
	stage: "",
};
const completedState: SpecialtySimulation.Form = {
	rank: "1 289",
	stage: "1",
};

describe("Specialties listing form", () => {
	const form = new SpecialtiesSimulationsForm();

	it.each([
		{
			key: "stage" as keyof SpecialtySimulation.Form,
			value: "1",
		},
		{
			key: "rank" as keyof SpecialtySimulation.Form,
			value: "1 289",
		},
		{
			key: "rank" as keyof SpecialtySimulation.Form,
			value: "47",
		},
	])("should change the form when $key is $value", ({ key, value }) => {
		const state = form.update(emptyInitialState, key, value);

		expect(state[key]).toBe(value);
	});

	it.each([
		{
			key: "rank" as keyof SpecialtySimulation.Form,
			value: "not a number",
			context: "is not a number",
			expected: "INVALID_RANK",
		},
		{
			key: "rank" as keyof SpecialtySimulation.Form,
			value: "",
			context: "is not a number",
			expected: "INVALID_RANK",
		},
		{
			key: "stage" as keyof SpecialtySimulation.Form,
			value: "99",
			context: "is not in the range",
			expected: "INVALID_STAGE",
		},
		{
			key: "stage" as keyof SpecialtySimulation.Form,
			value: "0",
			context: "is not in the range",
			expected: "INVALID_STAGE",
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
			stage: "1",
		},
		{
			rank: "8 384",
			stage: "1",
		},
	])("should be valid", ({ rank, stage }) => {
		const [isValid, errors] = form.validate({
			rank,
			stage,
		});

		expect(isValid).toBeTruthy();
		expect(errors).toEqual({
			rank: null,
			stage: null,
		});
	});
});
