"use client";

import styles from "./cities-listing-loader.module.scss";
/** NEXT-INTL */
import { useTranslations } from "next-intl";
/** REACT SPINNERS */
import { ClipLoader } from "react-spinners";

const CitiesListingLoader = () => {
	const t = useTranslations();

	return (
		<div className={styles.container}>
			<ClipLoader color="#ff0086" size={80} />
			<p>{t("CitiesRankListing.listing-loading")}</p>
		</div>
	);
};

export default CitiesListingLoader;
