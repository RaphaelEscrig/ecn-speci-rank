"use client";

import { ChangeEvent, type FormEvent, useId } from "react";
import styles from "./cities-rank-form.module.scss";
/** COMPONENTS */
import { Button } from "@/ui/Button/index.component";
import { Input } from "@/ui/Input/index.component";
/** FORMS */
import { useCitiesRankForm } from "@/modules/cities/react/hooks/use-cities-rank-form.hook";
/** NEXT-INTL */
import { useTranslations } from "next-intl";
/** REACT SELECT */
import Select from "react-select";
/** UTILS */
import { numberWithSpaces } from "@/modules/shared/utils/numbers.util";

const CitiesRankForm = () => {
	const { isValid, years, specialties, form, update, validate } =
		useCitiesRankForm();
	const id = useId();
	const t = useTranslations();

	const handleSubmit = (event: FormEvent): void => {
		event.preventDefault();

		console.log(isValid);
	};

	return (
		<form action="submit" className={styles.form} onSubmit={handleSubmit}>
			<Input
				label={t("CitiesRankForm.rank-label")}
				name="rank"
				placeholder={t("CitiesRankForm.rank-placeholder")}
				required
				type="text"
				value={numberWithSpaces(form.rank)}
				onChange={(event) => update("rank", event.target.value)}
			/>

			<div className={styles.specialty}>
				<span className={styles.label}>
					{t("CitiesRankForm.specialty-label")}
				</span>
				<Select
					classNamePrefix={"reactSelect"}
					instanceId={id}
					options={specialties.map((specialty) => ({
						label: t(`shared.specialties.${specialty.value}`),
						value: specialty.value as string,
					}))}
					placeholder={t("CitiesRankForm.specialty-placeholder")}
					required
					value={
						(specialties as { label: string; value: string }[]).find(
							(option) => option.value === form.specialty
						) ?? null
					}
					onChange={(newValue) =>
						newValue && update("specialty", newValue?.value)
					}
				/>
			</div>

			<div className={styles.specialty}>
				<span className={styles.label}>{t("CitiesRankForm.year-label")}</span>
				<Select
					classNamePrefix={"reactSelect"}
					instanceId={id}
					options={years}
					placeholder={t("CitiesRankForm.year-placeholder")}
					required
					value={years.find((option) => option.value === form.year) ?? null}
					onChange={(newValue) => newValue && update("year", newValue?.value)}
				/>
			</div>

			<Button className={styles.button} type="submit" variant="primary">
				<span>Valider</span>
			</Button>
		</form>
	);
};

export default CitiesRankForm;
