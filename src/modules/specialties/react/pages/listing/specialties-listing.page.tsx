import Link from "next/link";
import styles from "./specialties-listing.module.scss";
/** MODELS */
import type { Specialty } from "@/modules/specialties/core/domain/models";
/** NEXT-INTL */
import { useTranslations } from "next-intl";

const SpecialtiesListingPage = () => {
	const t = useTranslations();
	const data: Specialty.PerYear[] = [
		{
			code: "CMF",
			places: 21,
			bestRank: 89,
			worstRank: 1800,
		},
		{
			code: "CMF",
			places: 21,
			bestRank: 89,
			worstRank: 1800,
		},
		{
			code: "CMF",
			places: 21,
			bestRank: 89,
			worstRank: 1800,
		},
	];

	return (
		<main id={styles.page}>
			<div className={styles.container}>
				<div className={styles.listingHead}>
					<span>{t("SpecialtiesListingPage.listing-head-specialty")}</span>
					<span>{t("SpecialtiesListingPage.listing-head-places")}</span>
					<span className={styles.listingContentFirstRank}>
						{t("SpecialtiesListingPage.listing-head-best-rank")}
					</span>
					<span>{t("SpecialtiesListingPage.listing-head-worst-rank")}</span>
					<div />
				</div>

				<div className={styles.listingContent}>
					{data.map((data, index) => (
						<div key={index} className={styles.listingContentRow}>
							<div className={styles.listingContentSpecialty}>
								<span>{data.code}</span>
								<span className={styles.listingContentSpecialtyFullName}>
									{" "}
									- {t(`shared.specialties.${data.code}`)}
								</span>
							</div>
							<span className={styles.listingContentRowPlaces}>
								{data.places}
							</span>
							<span className={styles.listingContentFirstRank}>
								{data.bestRank}
							</span>
							<span className={styles.listingContentRowLastRank}>
								{data.worstRank}
							</span>
							<Link href={"/cities"}>
								{t("SpecialtiesListingPage.listing-see-cities")}
							</Link>
						</div>
					))}
				</div>
			</div>
		</main>
	);
};

export default SpecialtiesListingPage;
