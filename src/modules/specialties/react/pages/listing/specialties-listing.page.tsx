import styles from "./specialties-listing.module.scss";
import { Suspense } from "react";
import Link from "next/link";
/** ADAPTERS */
import app from "@/modules/app/main";
/** COMPONENTS */
import SpecialtiesListingLoader from "../../components/specialties-listing-loader/specialties-listing-loader.component";
import SpecialtiesListingFilters from "../../components/specialties-listing-filters/specialties-listing-filters.component";
/** NEXT-INTL */
import { getTranslations } from "next-intl/server";
/** USE CASES */
import { FindSpecialtiesPerYearUseCase } from "@/modules/specialties/core/use-cases/find-specialties-per-year.use-case";

// const getCachedListing = cache(
// 	async (year: number) =>
// 		await new FindSpecialtiesPerYearUseCase(
// 			app.dependencies.specialtiesGateway
// 		).execute({ year })
// );

const Listing = async ({ rank, year }: { rank?: number; year: number }) => {
	const { specialties } = await new FindSpecialtiesPerYearUseCase(
		app.dependencies.specialtiesGateway
	).execute({ year, rank });
	const t = await getTranslations();

	return (
		<div className={styles.listingContainer}>
			<div className={styles.listingHead}>
				<span>{t("SpecialtiesListingPage.listing-head-specialty")}</span>
				<span>{t("SpecialtiesListingPage.listing-head-places")}</span>
				<span className={styles.listingContentFirstRank}>
					{t("SpecialtiesListingPage.listing-head-best-rank")}
				</span>
				<span>{t("SpecialtiesListingPage.listing-head-worst-rank")}</span>
				<div />
				<div className={styles.seeRanking} />
			</div>

			<div className={styles.listingContent}>
				{specialties.map((specialty, index) => (
					<div
						key={index}
						className={styles.listingContentRow}
						data-has-rank={rank !== undefined}
						data-would-have-it={specialty.wouldHaveIt}
					>
						<div className={styles.listingContentSpecialty}>
							<span>{specialty.specialty}</span>
							<span className={styles.listingContentSpecialtyFullName}>
								{" "}
								- {t(`shared.specialties.${specialty.specialty}`)}
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
						<Link
							href={
								rank
									? `/cities?year=${year}&specialty=${specialty.specialty}&rank=${rank}`
									: `/cities?year=${year}&specialty=${specialty.specialty}`
							}
						>
							{t("SpecialtiesListingPage.listing-see-cities")}
						</Link>
						<Link
							className={styles.seeRanking}
							href={`/specialties/ranking?year=${year}&specialty=${specialty.specialty}`}
						>
							{t("SpecialtiesListingPage.listing-see-ranking")}
						</Link>
					</div>
				))}
			</div>
		</div>
	);
};

const SpecialtiesListingPage = ({
	year,
	rank,
}: {
	year: number;
	rank?: number;
}) => {
	return (
		<main id={styles.page}>
			<SpecialtiesListingFilters rank={rank} year={year} />
			<Suspense fallback={<SpecialtiesListingLoader />}>
				<Listing rank={rank} year={year} />
			</Suspense>
		</main>
	);
};

export default SpecialtiesListingPage;
