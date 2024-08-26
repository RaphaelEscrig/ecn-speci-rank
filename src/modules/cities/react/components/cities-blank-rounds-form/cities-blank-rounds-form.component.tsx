"use client";

import styles from "@/modules/cities/react/components/cities-blank-rounds-form/cities-blank-rounds-form.module.scss";
import { type FormEvent, useEffect, useId } from "react";
import { usePathname, useRouter } from "next/navigation";
/** COMPONENTS */
import { Button } from "@/ui/Button/index.component";
import { Input } from "@/ui/Input/index.component";
/** FORMS */
import { useCitiesBlankRoundsForm } from "@/modules/cities/react/hooks/use-cities-blank-rounds-form.hook";
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

const CitiesBlankRoundsForm = ({
	rank,
	round,
	specialty,
}: {
	rank?: string;
	round?: string;
	specialty?: SpecialtyCode;
}) => {
	const pathname = usePathname();
	const { replace } = useRouter();
	const { isValid, rounds, specialties, form, update, reset } =
		useCitiesBlankRoundsForm();
	const id = useId();
	const t = useTranslations();

	useEffect(() => {
		reset({
			rank: rank ?? "",
			round: round ?? "",
			specialty: specialty ?? "",
		});
	}, [rank, round, specialty, reset]);

	const handleSubmit = (event: FormEvent): void => {
		event.preventDefault();

		if (isValid) {
			const params = new URLSearchParams();

			params.set("rank", castStringNumberToNumber(form.rank).toString()); // Because form.rank can be "1 289"
			params.set("round", form.round);
			params.set("specialty", form.specialty);

			replace(`${pathname}?${params.toString()}`);
		}
	};

	return (
		<form action="submit" className={styles.form} onSubmit={handleSubmit}>
			<Input
				label={t("CitiesBlankRoundForm.rank-label")}
				name="rank"
				placeholder={t("CitiesBlankRoundForm.rank-placeholder")}
				required
				type="text"
				value={numberWithSpaces(form.rank)}
				onChange={(event) => update("rank", event.target.value)}
			/>

			<div className={styles.specialty}>
				<span className={styles.label}>
					{t("CitiesBlankRoundForm.specialty-label")}
				</span>
				<Select
					classNamePrefix={"reactSelect"}
					instanceId={id}
					options={specialties.map((specialty) => ({
						label: t(`shared.specialties.${specialty.value}`),
						value: specialty.value as string,
					}))}
					placeholder={t("CitiesBlankRoundForm.specialty-placeholder")}
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
					{t("CitiesBlankRoundForm.round-label")}
				</span>
				<Select
					classNamePrefix={"reactSelect"}
					instanceId={id}
					options={rounds}
					placeholder={t("CitiesBlankRoundForm.round-placeholder")}
					required
					value={rounds.find((option) => option.value === form.round) ?? null}
					onChange={(newValue) => newValue && update("round", newValue?.value)}
				/>
			</div>

			<Button className={styles.button} type="submit" variant="primary">
				<span>{t("CitiesBlankRoundForm.submit")}</span>
			</Button>
		</form>
	);
};

export default CitiesBlankRoundsForm;
