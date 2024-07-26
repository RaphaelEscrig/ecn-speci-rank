import styles from "./specialties-ranking.module.scss";
import { Suspense } from "react";
import Link from "next/link";
/** ADAPTERS */
import app from "@/modules/app/main";
/** COMPONENTS */
import SpecialtiesListingLoader from "../../components/specialties-listing-loader/specialties-listing-loader.component";
/** MODELS */
import type { SpecialtyCode } from "@/modules/shared/domain/models";
/** NEXT-INTL */
import { getTranslations } from "next-intl/server";
/** USE CASES */
import SpecialtiesRankingFilters from "../../components/specialties-ranking-filters/specialties-ranking-filters.component";

// const Listing = async ({ rank, year }: { rank?: number; year: number }) => {
// 	const { specialties } = await new FindSpecialtiesPerYearUseCase(
// 		app.dependencies.specialtiesGateway
// 	).execute({ year, rank });
// 	const t = await getTranslations();

// 	return (
// 		<div className={styles.listingContainer}>
// 			<div className={styles.listingHead}>
// 				<span>{t("SpecialtiesRankingPage.listing-head-specialty")}</span>
// 				<span>{t("SpecialtiesRankingPage.listing-head-places")}</span>
// 				<span className={styles.listingContentFirstRank}>
// 					{t("SpecialtiesRankingPage.listing-head-best-rank")}
// 				</span>
// 				<span>{t("SpecialtiesRankingPage.listing-head-worst-rank")}</span>
// 				<div />
// 			</div>

// 			<div className={styles.listingContent}>
// 				{specialties.map((specialty, index) => (
// 					<div
// 						key={index}
// 						className={styles.listingContentRow}
// 						data-has-rank={rank !== undefined}
// 						data-would-have-it={specialty.wouldHaveIt}
// 					>
// 						<div className={styles.listingContentSpecialty}>
// 							<span>{specialty.specialty}</span>
// 							<span className={styles.listingContentSpecialtyFullName}>
// 								{" "}
// 								- {t(`shared.specialties.${specialty.specialty}`)}
// 							</span>
// 						</div>
// 						<span className={styles.listingContentRowPlaces}>
// 							{specialty.places}
// 						</span>
// 						<span className={styles.listingContentFirstRank}>
// 							{specialty.bestRank}
// 						</span>
// 						<span className={styles.listingContentRowLastRank}>
// 							{specialty.worstRank}
// 						</span>
// 						<Link
// 							href={
// 								rank
// 									? `/cities?year=${year}&specialty=${specialty.specialty}&rank=${rank}`
// 									: `/cities?year=${year}&specialty=${specialty.specialty}`
// 							}
// 						>
// 							{t("SpecialtiesRankingPage.listing-see-cities")}
// 						</Link>
// 					</div>
// 				))}
// 			</div>
// 		</div>
// 	);
// };

const SpecialtiesRankingPage = ({
	year,
	specialty,
}: {
	year: number;
	specialty?: SpecialtyCode;
}) => {
	return (
		<main id={styles.page}>
			<SpecialtiesRankingFilters specialty={specialty} year={year} />
			{/* <Suspense fallback={<SpecialtiesListingLoader />}>
				<Listing rank={rank} year={year} />
			</Suspense> */}
		</main>
	);
};

export default SpecialtiesRankingPage;
