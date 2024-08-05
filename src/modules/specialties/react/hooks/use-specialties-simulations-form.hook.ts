import { useCallback, useRef, useState } from "react";
/** CONSTANTS */
import {
	SPECIALTIES_SIMULATION_MAX_STAGE,
	SPECIALTIES_SIMULATION_MIN_STAGE,
} from "@/modules/specialties/core/domain/constants";
/** FORMS */
import { SpecialtiesSimulationsForm } from "@/modules/specialties/core/forms/specialties-simulations.form";
/** MODELS */
import type { SpecialtySimulation } from "@/modules/specialties/core/domain/models";

export const useSpecialtiesSimulationsForm = () => {
	const specialtiesForm = useRef(new SpecialtiesSimulationsForm());
	const [form, setForm] = useState<SpecialtySimulation.Form>({
		stage: "",
		rank: "",
	});
	const [errors, setErrors] = useState<SpecialtySimulation.FormErrors>({
		rank: null,
		stage: null,
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

	const update = <T extends keyof SpecialtySimulation.Form>(
		key: T,
		value: SpecialtySimulation.Form[T]
	): void => {
		const state = specialtiesForm.current.update(form, key, value);

		setForm(state);
		setErrors((current) => ({ ...current, [key]: null }));
	};

	const validate = (): void => {
		const [_, formErrors] = specialtiesForm.current.validate(form);

		setErrors(formErrors);
	};

	const isValid = (): boolean => {
		const [isValid, _] = specialtiesForm.current.validate(form);

		return isValid;
	};

	const reset = useCallback((data: Partial<SpecialtySimulation.Form>): void => {
		setForm((current) => ({ ...current, ...data }));
	}, []);

	return {
		stages,
		errors,
		form,
		isValid: isValid(),
		reset,
		validate,
		update,
	};
};
