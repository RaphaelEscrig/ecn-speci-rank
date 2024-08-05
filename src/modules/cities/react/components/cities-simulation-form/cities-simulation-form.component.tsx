"use client";

import { type FormEvent, useEffect, useId } from "react";
import styles from "./cities-simulation-form.module.scss";
import { usePathname, useRouter } from "next/navigation";
/** COMPONENTS */
import { Button } from "@/ui/Button/index.component";
import { Input } from "@/ui/Input/index.component";
/** FORMS */
import { useCitiesSimulationForm } from "@/modules/cities/react/hooks/use-cities-simulation-form.hook";
/** MODELS */
import type { SpecialtyCode } from "@/modules/shared/domain/models";
/** NEXT-INTL */
import { useTranslations } from "next-intl";
/** REACT SELECT */
import Select from "react-select";
/** UTILS */
import {
	castStringNumberToNumber,
	numberWithSpaces,
} from "@/modules/shared/utils/numbers.util";

const CitiesSimulationForm = ({
	rank,
	stage,
	specialty,
}: {
	rank?: string;
	stage?: string;
	specialty?: SpecialtyCode;
}) => {
	const pathname = usePathname();
	const { replace } = useRouter();
	const { isValid, stages, specialties, form, update, reset } =
		useCitiesSimulationForm();
	const id = useId();
	const t = useTranslations();

	useEffect(() => {
		reset({
			rank: rank ?? "",
			stage: stage ?? "",
			specialty: specialty ?? "",
		});
	}, [rank, stage, specialty, reset]);

	const handleSubmit = (event: FormEvent): void => {
		event.preventDefault();

		if (isValid) {
			const params = new URLSearchParams();

			params.set("rank", castStringNumberToNumber(form.rank).toString()); // Because form.rank can be "1 289"
			params.set("stage", form.stage);
			params.set("specialty", form.specialty);

			replace(`${pathname}?${params.toString()}`);
		}
	};

	return (
		<form action="submit" className={styles.form} onSubmit={handleSubmit}>
			<Input
				label={t("CitiesSimulationForm.rank-label")}
				name="rank"
				placeholder={t("CitiesSimulationForm.rank-placeholder")}
				required
				type="text"
				value={numberWithSpaces(form.rank)}
				onChange={(event) => update("rank", event.target.value)}
			/>

			<div className={styles.specialty}>
				<span className={styles.label}>
					{t("CitiesSimulationForm.specialty-label")}
				</span>
				<Select
					classNamePrefix={"reactSelect"}
					instanceId={id}
					options={specialties.map((specialty) => ({
						label: t(`shared.specialties.${specialty.value}`),
						value: specialty.value as string,
					}))}
					placeholder={t("CitiesSimulationForm.specialty-placeholder")}
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
				<span className={styles.label}>
					{t("CitiesSimulationForm.stage-label")}
				</span>
				<Select
					classNamePrefix={"reactSelect"}
					instanceId={id}
					options={stages}
					placeholder={t("CitiesSimulationForm.stage-placeholder")}
					required
					value={stages.find((option) => option.value === form.stage) ?? null}
					onChange={(newValue) => newValue && update("stage", newValue?.value)}
				/>
			</div>

			<Button className={styles.button} type="submit" variant="primary">
				<span>{t("CitiesSimulationForm.submit")}</span>
			</Button>
		</form>
	);
};

export default CitiesSimulationForm;
