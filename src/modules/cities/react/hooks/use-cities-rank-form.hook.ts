import { useCallback, useRef, useState } from "react";
/** CONSTANTS */
import { SPECIALTIES_YEARS } from "@/modules/specialties/core/domain/constants";
import { SPECIALTIES } from "@/modules/shared/domain/constants";
/** FORMS */
import { CitiesRankForm } from "@/modules/cities/core/forms/cities-rank.form";
/** MODELS */
import type { CityRank } from "@/modules/cities/core/domain/models";

export const useCitiesRankForm = () => {
	const citiesRankForm = useRef(new CitiesRankForm());
	const [form, setForm] = useState<CityRank.Form>({
		year: "",
		rank: "",
		specialty: "",
	});
	const [errors, setErrors] = useState<CityRank.FormErrors>({
		rank: null,
		year: null,
		specialty: null,
	});
	const [years] = useState(
		SPECIALTIES_YEARS.map((year) => ({ label: year, value: year.toString() }))
	);
	const [specialties] = useState(
		Array.from(
			SPECIALTIES.values().map((specialty) => ({
				label: specialty,
				value: specialty,
			}))
		)
	);

	const update = <T extends keyof CityRank.Form>(
		key: T,
		value: CityRank.Form[T]
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

	const reset = useCallback((data: Partial<CityRank.Form>): void => {
		setForm((current) => ({ ...current, ...data }));
	}, []);

	return {
		years,
		specialties,
		errors,
		form,
		isValid: isValid(),
		reset,
		validate,
		update,
	};
};
