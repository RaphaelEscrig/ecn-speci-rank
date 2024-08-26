"use client";

import { type FormEvent, useEffect, useId } from "react";
import styles from "@/modules/specialties/react/components/specialties-blank-rounds-filters/specialties-blank-rounds-filters.module.scss";
import { usePathname, useRouter } from "next/navigation";
/** COMPONENTS */
import { Input } from "@/ui/Input/index.component";
import { Button } from "@/ui/Button/index.component";
/** FORMS */
import { useSpecialtiesBlankRoundsForm } from "@/modules/specialties/react/hooks/use-specialties-blank-rounds-form.hook";
/** REACT SELECT */
import Select from "react-select";
/** NEXT-INTL */
import { useTranslations } from "next-intl";
/** UTILS */
import { numberWithSpaces } from "@/modules/shared/utils/numbers.util";

const SpecialtiesBlankRoundsFilters = ({
	round,
	rank,
}: {
	round: number;
	rank?: number;
}) => {
	const { rounds, form, update, reset } = useSpecialtiesBlankRoundsForm();
	const pathname = usePathname();
	const { replace } = useRouter();
	const id = useId();
	const t = useTranslations("SpecialtiesBlankRoundsFilters");

	useEffect(() => {
		reset({
			round: round.toString(),
			rank: rank ? rank.toString() : "",
		});
	}, [round, rank, reset]);

	const handleSubmit = (event: FormEvent) => {
		event.preventDefault();

		const params = new URLSearchParams();
		params.set("round", form.round);

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

			<div className={styles.round}>
				<span className={styles.label}>{t("round-label")}</span>

				<Select
					classNamePrefix={"reactSelect"}
					instanceId={id}
					options={rounds}
					placeholder={t("round-placeholder")}
					value={rounds.find((option) => option.value === form.round) ?? null}
					onChange={(newValue) => newValue && update("round", newValue.value)}
				/>
			</div>

			<Button type="submit" variant="primary">
				<span>{t("submit")}</span>
			</Button>
		</form>
	);
};

export default SpecialtiesBlankRoundsFilters;
