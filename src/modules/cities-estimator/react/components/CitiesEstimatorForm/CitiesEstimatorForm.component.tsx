"use client";
import { type FormEvent, useId, useState } from "react";
import styles from "./CitiesEstimatorForm.module.scss";
/** REACT SELECT */
import Select from "react-select";
import { SPECIALTIES } from "@/modules/shared/domain/constants";
import { Input } from "@/ui/Input/index.component";
import { numberWithSpaces } from "@/modules/shared/utils/numbers.util";
import { Button } from "@/ui/Button/index.component";
import { useTranslations } from "next-intl";

export const CitiesEstimatorForm = ({
	onSubmit,
}: {
	onSubmit: (form: { rank: string; specialty: string; year: string }) => void;
}) => {
	const t = useTranslations("CitiesEstimator");
	const [form, setForm] = useState({
		rank: "",
		specialty: "",
		year: "",
	});
	const [options] = useState(
		Array.from(SPECIALTIES, ([label, value]) => ({
			value,
			label,
		}))
	);
	const [years] = useState([
		{
			label: "2023-2024",
			value: "2023",
		},
		{
			label: "2022-2023",
			value: "2022",
		},
		{
			label: "2020-2021",
			value: "2020",
		},
		{
			label: "2019-2020",
			value: "2019",
		},
	]);
	const id = useId();

	const handleSubmit = (event: FormEvent): void => {
		event.preventDefault();

		onSubmit(form);
	};

	const onChange = (key: string, value: string): void => {
		setForm((current) => ({ ...current, [key]: value }));
	};

	return (
		<form action="submit" className={styles.form} onSubmit={handleSubmit}>
			<Input
				label={t("rank-label")}
				name="rank"
				placeholder="Entrez votre rang"
				required
				type="text"
				value={numberWithSpaces(form.rank)}
				onChange={(event) => onChange("rank", event.target.value)}
			/>

			<div className={styles.specialty}>
				<span className={styles.label}>{"Sélectionnez votre spécialité"}</span>
				<Select
					classNamePrefix={"reactSelect"}
					instanceId={id}
					options={options}
					placeholder={"Sélectionnez une spécialité"}
					required
					value={
						options.find((option) => option.value === form.specialty) ?? null
					}
					onChange={(newValue) =>
						newValue && onChange("specialty", newValue?.value)
					}
				/>
			</div>

			<div className={styles.specialty}>
				<span className={styles.label}>
					{"Sélectionnez l'année des résultats"}
				</span>
				<Select
					classNamePrefix={"reactSelect"}
					instanceId={id}
					options={years}
					placeholder={"Sélectionnez une année"}
					required
					value={years.find((option) => option.value === form.year) ?? null}
					onChange={(newValue) => newValue && onChange("year", newValue?.value)}
				/>
			</div>

			<Button className={styles.button} type="submit" variant="primary">
				<span>Valider</span>
			</Button>
		</form>
	);
};
