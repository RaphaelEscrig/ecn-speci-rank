import { useCallback, useRef, useState } from "react";
/** CONSTANTS */
import { SPECIALTIES_YEARS } from "@/modules/specialties/core/domain/constants";
/** FORMS */
import { SpecialtiesForm } from "@/modules/specialties/core/forms/specialties.form";
/** MODELS */
import type { Specialty } from "@/modules/specialties/core/domain/models";

export const useSpecialtiesForm = () => {
	const specialtiesForm = useRef(new SpecialtiesForm());
	const [form, setForm] = useState<Specialty.Form>({
		year: "",
		rank: "",
	});
	const [errors, setErrors] = useState<Specialty.FormErrors>({
		rank: null,
		year: null,
	});
	const [years] = useState(
		SPECIALTIES_YEARS.map((year) => ({ label: year, value: year.toString() }))
	);

	const update = <T extends keyof Specialty.Form>(
		key: T,
		value: Specialty.Form[T]
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

	const reset = useCallback((data: Partial<Specialty.Form>): void => {
		setForm((current) => ({ ...current, ...data }));
	}, []);

	return {
		years,
		errors,
		form,
		isValid: isValid(),
		reset,
		validate,
		update,
	};
};
