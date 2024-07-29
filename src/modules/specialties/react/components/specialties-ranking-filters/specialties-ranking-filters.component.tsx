"use client";

import styles from "./specialties-ranking-filters.module.scss";
import { type FormEvent, useEffect, useId } from "react";
import { usePathname, useRouter } from "next/navigation";
/** COMPONENTS */
import { Button } from "@/ui/Button/index.component";
/** FORMS */
import { useSpecialtiesRankingForm } from "@/modules/specialties/react/hooks/use-specialties-ranking-form.hook";
/** MODELS */
import type { SpecialtyCode } from "@/modules/shared/domain/models";
/** REACT SELECT */
import Select from "react-select";
/** NEXT-INTL */
import { useTranslations } from "next-intl";

const SpecialtiesRankingFilters = ({
	year,
	specialty,
}: {
	year: number;
	specialty?: SpecialtyCode;
}) => {
	const { years, specialties, form, update, reset } =
		useSpecialtiesRankingForm();
	const pathname = usePathname();
	const { replace } = useRouter();
	const id = useId();
	const t = useTranslations("SpecialtiesRankingFilters");

	useEffect(() => {
		reset({
			year: year.toString(),
			specialty: specialty ? specialty.toString() : "",
		});
	}, [year, specialty, reset]);

	const handleSubmit = (event: FormEvent) => {
		event.preventDefault();

		const params = new URLSearchParams();
		params.set("year", form.year);

		if (form.specialty) {
			params.set("specialty", form.specialty);
		}

		replace(`${pathname}?${params.toString()}`);
	};

	return (
		<form className={styles.container} onSubmit={handleSubmit}>
			<div className={styles.specialty}>
				<span className={styles.label}>{t("specialty-label")}</span>

				<Select
					classNamePrefix={"reactSelect"}
					instanceId={id}
					options={specialties}
					placeholder={t("specialty-placeholder")}
					value={
						specialties.find((option) => option.value === form.specialty) ??
						null
					}
					onChange={(newValue) =>
						newValue && update("specialty", newValue.value)
					}
				/>
			</div>

			<div className={styles.year}>
				<span className={styles.label}>{t("year-label")}</span>

				<Select
					classNamePrefix={"reactSelect"}
					instanceId={id}
					options={years}
					placeholder={t("year-placeholder")}
					value={years.find((option) => option.value === form.year) ?? null}
					onChange={(newValue) => newValue && update("year", newValue.value)}
				/>
			</div>

			<Button type="submit" variant="primary">
				<span>{t("submit")}</span>
			</Button>
		</form>
	);
};

export default SpecialtiesRankingFilters;
