"use client";

import { type FormEvent, useEffect, useId } from "react";
import styles from "./specialties-listing-filters.module.scss";
import { usePathname, useRouter } from "next/navigation";
/** COMPONENTS */
import { Input } from "@/ui/Input/index.component";
import { Button } from "@/ui/Button/index.component";
/** FORMS */
import { useSpecialtiesForm } from "@/modules/specialties/react/hooks/use-specialties-form.hook";
/** REACT SELECT */
import Select from "react-select";
/** NEXT-INTL */
import { useTranslations } from "next-intl";
/** UTILS */
import { numberWithSpaces } from "@/modules/shared/utils/numbers.util";

const SpecialtiesListingFilters = ({
	year,
	rank,
}: {
	year: number;
	rank?: number;
}) => {
	const { years, form, update, reset } = useSpecialtiesForm();
	const pathname = usePathname();
	const { replace } = useRouter();
	const id = useId();
	const t = useTranslations("SpecialtiesListingFilters");

	useEffect(() => {
		reset({
			year: year.toString(),
			rank: rank ? rank.toString() : "",
		});
	}, [year, rank, reset]);

	const handleSubmit = (event: FormEvent) => {
		event.preventDefault();

		const params = new URLSearchParams();
		params.set("year", form.year);

		if (form.rank) {
			params.set("rank", form.rank);
		}

		replace(`${pathname}?${params.toString()}`);
	};

	return (
		<form className={styles.container} onSubmit={handleSubmit}>
			<Input
				label={t("rank-label")}
				name="rank"
				placeholder={t("rank-placeholder")}
				type="text"
				value={numberWithSpaces(form.rank ?? "")}
				onChange={(event) => update("rank", event.target.value)}
			/>

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

export default SpecialtiesListingFilters;
