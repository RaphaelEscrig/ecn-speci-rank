import { useCallback, useRef, useState } from "react";
/** CONSTANTS */
import {
	SPECIALTIES_BLANK_ROUND_MAX_ROUND,
	SPECIALTIES_BLANK_ROUND_MIN_ROUND,
} from "@/modules/specialties/core/domain/constants";
import { SPECIALTIES } from "@/modules/shared/domain/constants";
/** FORMS */
import { CitiesBlankRoundsForm } from "@/modules/cities/core/forms/cities-blank-rounds.form";
/** MODELS */
import type { CityBlankRound } from "@/modules/cities/core/domain/models";

export const useCitiesBlankRoundsForm = () => {
	const citiesRankForm = useRef(new CitiesBlankRoundsForm());
	const [form, setForm] = useState<CityBlankRound.Form>({
		round: "",
		rank: "",
		specialty: "",
	});
	const [errors, setErrors] = useState<CityBlankRound.FormErrors>({
		rank: null,
		round: null,
		specialty: null,
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
	const [specialties] = useState(
		Array.from(SPECIALTIES.values()).map((specialty) => ({
			label: specialty,
			value: specialty,
		}))
	);

	const update = <T extends keyof CityBlankRound.Form>(
		key: T,
		value: CityBlankRound.Form[T]
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

	const reset = useCallback((data: Partial<CityBlankRound.Form>): void => {
		setForm((current) => ({ ...current, ...data }));
	}, []);

	return {
		rounds,
		specialties,
		errors,
		form,
		isValid: isValid(),
		reset,
		validate,
		update,
	};
};
