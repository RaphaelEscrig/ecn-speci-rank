import { useCallback, useRef, useState } from "react";
/** CONSTANTS */
import { SPECIALTIES_YEARS } from "@/modules/specialties/core/domain/constants";
import { SPECIALTIES } from "@/modules/shared/domain/constants";
/** FORMS */
import { SpecialtiesRankingForm } from "@/modules/specialties/core/forms/specialties-ranking.form";
/** MODELS */
import type { SpecialtyRanking } from "@/modules/specialties/core/domain/models";

export const useSpecialtiesRankingForm = () => {
	const specialtiesRankingForm = useRef(new SpecialtiesRankingForm());
	const [form, setForm] = useState<SpecialtyRanking.Form>({
		year: "",
		specialty: "",
	});
	const [errors, setErrors] = useState<SpecialtyRanking.FormErrors>({
		specialty: null,
		year: null,
	});
	const [years] = useState(
		SPECIALTIES_YEARS.map((year) => ({ label: year, value: year.toString() }))
	);
	const [specialties] = useState(
		Array.from(SPECIALTIES.values()).map((specialty) => ({
			label: specialty,
			value: specialty,
		}))
	);

	const update = <T extends keyof SpecialtyRanking.Form>(
		key: T,
		value: SpecialtyRanking.Form[T]
	): void => {
		const state = specialtiesRankingForm.current.update(form, key, value);

		setForm(state);
		setErrors((current) => ({ ...current, [key]: null }));
	};

	const validate = (): void => {
		const [_, formErrors] = specialtiesRankingForm.current.validate(form);

		setErrors(formErrors);
	};

	const isValid = (): boolean => {
		const [isValid, _] = specialtiesRankingForm.current.validate(form);

		return isValid;
	};

	const reset = useCallback((data: Partial<SpecialtyRanking.Form>): void => {
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
