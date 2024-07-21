"use client";

import styles from "./specialties-listing-loader.module.scss";
/** NEXT-INTL */
import { useTranslations } from "next-intl";
/** REACT SPINNERS */
import { ClipLoader } from "react-spinners";

const SpecialtiesListingLoader = () => {
	const t = useTranslations();

	return (
		<div className={styles.container}>
			<ClipLoader color="#ff0086" size={80} />
			<p>{t("SpecialtiesListingPage.listing-loading")}</p>
		</div>
	);
};

export default SpecialtiesListingLoader;
