// /** FORMS */
import { CitiesSimulationForm } from "@/modules/cities/core/forms/cities-simulation.form";
// /** MODELS */
import type { CitySimulation } from "@/modules/cities/core/domain/models";

const emptyInitialState: CitySimulation.Form = {
	rank: "",
	stage: "",
	specialty: "",
};
const completedState: CitySimulation.Form = {
	rank: "1 289",
	stage: "1",
	specialty: "CMF",
};

describe("Cities rank form", () => {
	const form = new CitiesSimulationForm();

	it.each([
		{
			key: "stage" as keyof CitySimulation.Form,
			value: "1",
		},
		{
			key: "rank" as keyof CitySimulation.Form,
			value: "1 289",
		},
		{
			key: "rank" as keyof CitySimulation.Form,
			value: "47",
		},
		{
			key: "specialty" as keyof CitySimulation.Form,
			value: "CMF",
		},
		{
			key: "specialty" as keyof CitySimulation.Form,
			value: "",
		},
	])("should change the form when $key is $value", ({ key, value }) => {
		const state = form.update(emptyInitialState, key, value);

		expect(state[key]).toBe(value);
	});

	it.each([
		{
			key: "rank" as keyof CitySimulation.Form,
			value: "",
			context: "is empty",
			expected: "INVALID_RANK",
		},
		{
			key: "rank" as keyof CitySimulation.Form,
			value: "not a number",
			context: "is not a number",
			expected: "INVALID_RANK",
		},
		{
			key: "stage" as keyof CitySimulation.Form,
			value: "99",
			context: "is not in the range",
			expected: "INVALID_STAGE",
		},
		{
			key: "stage" as keyof CitySimulation.Form,
			value: "0",
			context: "is not in the range",
			expected: "INVALID_STAGE",
		},
		{
			key: "specialty" as keyof CitySimulation.Form,
			value: "",
			context: "is empty",
			expected: "INVALID_SPECIALTY",
		},
		{
			key: "specialty" as keyof CitySimulation.Form,
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
			stage: "1",
			specialty: "CMF",
		},
		{
			rank: "8 384",
			stage: "1",
			specialty: "CMF",
		},
	])("should be valid", ({ rank, stage, specialty }) => {
		const [isValid, errors] = form.validate({
			rank,
			stage,
			specialty,
		});

		expect(isValid).toBeTruthy();
		expect(errors).toEqual({
			rank: null,
			stage: null,
			specialty: null,
		});
	});
});
