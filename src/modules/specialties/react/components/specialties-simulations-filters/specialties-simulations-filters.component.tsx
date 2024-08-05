"use client";

import { type FormEvent, useEffect, useId } from "react";
import styles from "./specialties-simulations-filters.module.scss";
import { usePathname, useRouter } from "next/navigation";
/** COMPONENTS */
import { Input } from "@/ui/Input/index.component";
import { Button } from "@/ui/Button/index.component";
/** FORMS */
import { useSpecialtiesSimulationsForm } from "@/modules/specialties/react/hooks/use-specialties-simulations-form.hook";
/** REACT SELECT */
import Select from "react-select";
/** NEXT-INTL */
import { useTranslations } from "next-intl";
/** UTILS */
import { numberWithSpaces } from "@/modules/shared/utils/numbers.util";

const SpecialtiesSimulationsFilters = ({
	stage,
	rank,
}: {
	stage: number;
	rank?: number;
}) => {
	const { stages, form, update, reset } = useSpecialtiesSimulationsForm();
	const pathname = usePathname();
	const { replace } = useRouter();
	const id = useId();
	const t = useTranslations("SpecialtiesSimulationsFilters");

	useEffect(() => {
		reset({
			stage: stage.toString(),
			rank: rank ? rank.toString() : "",
		});
	}, [stage, rank, reset]);

	const handleSubmit = (event: FormEvent) => {
		event.preventDefault();

		const params = new URLSearchParams();
		params.set("stage", form.stage);

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

			<div className={styles.stage}>
				<span className={styles.label}>{t("stage-label")}</span>

				<Select
					classNamePrefix={"reactSelect"}
					instanceId={id}
					options={stages}
					placeholder={t("stage-placeholder")}
					value={stages.find((option) => option.value === form.stage) ?? null}
					onChange={(newValue) => newValue && update("stage", newValue.value)}
				/>
			</div>

			<Button type="submit" variant="primary">
				<span>{t("submit")}</span>
			</Button>
		</form>
	);
};

export default SpecialtiesSimulationsFilters;
