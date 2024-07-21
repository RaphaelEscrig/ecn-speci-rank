"use client";

import { useId, useState, type ChangeEvent } from "react";
import styles from "./specialties-listing-filters.module.scss";
import { usePathname, useRouter } from "next/navigation";
/** CONSTANTS */
import { SPECIALTIES_YEARS } from "@/modules/specialties/core/domain/constants";
/** REACT SELECT */
import Select from "react-select";
/** NEXT-INTL */
import { useTranslations } from "next-intl";

const SpecialtiesListingFilters = ({ year }: { year: number }) => {
	const pathname = usePathname();
	const { replace } = useRouter();
	const id = useId();
	const t = useTranslations("SpecialtiesListingPage");
	const [current, setCurrent] = useState({ label: year, value: year });
	const [years] = useState(
		SPECIALTIES_YEARS.map((year) => ({ label: year, value: year }))
	);

	const handleChange = (value: number) => {
		const params = new URLSearchParams();
		params.set("year", value.toString());

		setCurrent({
			label: value,
			value,
		});

		replace(`${pathname}?${params.toString()}`);
	};

	return (
		<div className={styles.container}>
			<span className={styles.label}>{t("listing-select-year-label")}</span>

			<Select
				classNamePrefix={"reactSelect"}
				instanceId={id}
				options={years}
				placeholder={t("listing-select-year-placeholder")}
				value={current}
				onChange={(newValue) => newValue && handleChange(newValue.value)}
			/>
			{/* <label htmlFor="year-select">{t("listing-select-year-label")}</label> */}

			{/* <select
				id="year-select"
				name="year"
				value={year.toString()}
				onChange={(event) => handleChange(parseInt(event.target.value))}
			>
				<option value="2023">2023</option>
				<option value="2022">2022</option>
				<option value="2021">2021</option>
				<option value="2020">2020</option>
				<option value="2019">2019</option>
			</select> */}
		</div>
	);
};

export default SpecialtiesListingFilters;