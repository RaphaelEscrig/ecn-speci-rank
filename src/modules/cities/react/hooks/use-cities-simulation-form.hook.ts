import { useCallback, useRef, useState } from "react";
/** CONSTANTS */
import {
	SPECIALTIES_SIMULATION_MAX_STAGE,
	SPECIALTIES_SIMULATION_MIN_STAGE,
} from "@/modules/specialties/core/domain/constants";
import { SPECIALTIES } from "@/modules/shared/domain/constants";
/** FORMS */
import { CitiesSimulationForm } from "../../core/forms/cities-simulation.form";
/** MODELS */
import type { CitySimulation } from "@/modules/cities/core/domain/models";

export const useCitiesSimulationForm = () => {
	const citiesRankForm = useRef(new CitiesSimulationForm());
	const [form, setForm] = useState<CitySimulation.Form>({
		stage: "",
		rank: "",
		specialty: "",
	});
	const [errors, setErrors] = useState<CitySimulation.FormErrors>({
		rank: null,
		stage: null,
		specialty: null,
	});
	const [stages] = useState(
		Array.from(
			{
				length:
					SPECIALTIES_SIMULATION_MAX_STAGE -
					SPECIALTIES_SIMULATION_MIN_STAGE +
					1,
			},
			(_, i) => ({
				label: i + SPECIALTIES_SIMULATION_MIN_STAGE,
				value: (i + SPECIALTIES_SIMULATION_MIN_STAGE).toString(),
			})
		)
	);
	const [specialties] = useState(
		Array.from(SPECIALTIES.values()).map((specialty) => ({
			label: specialty,
			value: specialty,
		}))
	);

	const update = <T extends keyof CitySimulation.Form>(
		key: T,
		value: CitySimulation.Form[T]
	): void => {
		const state = citiesRankForm.current.update(form, key, value);

		setForm(state);
		setErrors((current) => ({ ...current, [key]: null }));
	};

	const validate = (): void => {
		const [_, formErrors] = citiesRankForm.current.validate(form);

		setErrors(formErrors);
	};

	const isValid = (): boolean => {
		const [isValid, _] = citiesRankForm.current.validate(form);

		return isValid;
	};

	const reset = useCallback((data: Partial<CitySimulation.Form>): void => {
		setForm((current) => ({ ...current, ...data }));
	}, []);

	return {
		stages,
		specialties,
		errors,
		form,
		isValid: isValid(),
		reset,
		validate,
		update,
	};
};
