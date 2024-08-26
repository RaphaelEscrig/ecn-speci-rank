import { useCallback, useRef, useState } from "react";
/** CONSTANTS */
import {
	SPECIALTIES_BLANK_ROUND_MIN_ROUND,
	SPECIALTIES_BLANK_ROUND_MAX_ROUND,
} from "@/modules/specialties/core/domain/constants";
/** FORMS */
import { SpecialtiesBlankRoundsForm } from "@/modules/specialties/core/forms/specialties-blank-rounds.form";
/** MODELS */
import type { SpecialtyBlankRound } from "@/modules/specialties/core/domain/models";

export const useSpecialtiesBlankRoundsForm = () => {
	const specialtiesForm = useRef(new SpecialtiesBlankRoundsForm());
	const [form, setForm] = useState<SpecialtyBlankRound.Form>({
		round: "",
		rank: "",
	});
	const [errors, setErrors] = useState<SpecialtyBlankRound.FormErrors>({
		rank: null,
		round: null,
	});
	const [rounds] = useState(
		Array.from(
			{
				length:
					SPECIALTIES_BLANK_ROUND_MAX_ROUND -
					SPECIALTIES_BLANK_ROUND_MIN_ROUND +
					1,
			},
			(_, i) => ({
				label: i + SPECIALTIES_BLANK_ROUND_MIN_ROUND,
				value: (i + SPECIALTIES_BLANK_ROUND_MIN_ROUND).toString(),
			})
		)
	);

	const update = <T extends keyof SpecialtyBlankRound.Form>(
		key: T,
		value: SpecialtyBlankRound.Form[T]
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

	const reset = useCallback((data: Partial<SpecialtyBlankRound.Form>): void => {
		setForm((current) => ({ ...current, ...data }));
	}, []);

	return {
		rounds,
		errors,
		form,
		isValid: isValid(),
		reset,
		validate,
		update,
	};
};
