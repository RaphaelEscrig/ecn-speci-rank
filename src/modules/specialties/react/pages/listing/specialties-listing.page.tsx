import Link from "next/link";
import styles from "./specialties-listing.module.scss";
/** ADAPTERS */
import app from "@/modules/app/main";
/** MODELS */
import type { Specialty } from "@/modules/specialties/core/domain/models";
/** NEXT-INTL */
import { getTranslations } from "next-intl/server";
/** USE CASES */
import { FindSpecialtiesPerYearUseCase } from "@/modules/specialties/core/use-cases/find-specialties-per-year.use-case";

const SpecialtiesListingPage = async () => {
	const { specialties } = await new FindSpecialtiesPerYearUseCase(
		app.dependencies.specialtiesGateway
	).execute({ year: 2023 });
	const t = await getTranslations();

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
					{specialties.map((specialty, index) => (
						<div key={index} className={styles.listingContentRow}>
							<div className={styles.listingContentSpecialty}>
								<span>{specialty.code}</span>
								<span className={styles.listingContentSpecialtyFullName}>
									{" "}
									- {t(`shared.specialties.${specialty.code}`)}
								</span>
							</div>
							<span className={styles.listingContentRowPlaces}>
								{specialty.places}
							</span>
							<span className={styles.listingContentFirstRank}>
								{specialty.bestRank}
							</span>
							<span className={styles.listingContentRowLastRank}>
								{specialty.worstRank}
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
