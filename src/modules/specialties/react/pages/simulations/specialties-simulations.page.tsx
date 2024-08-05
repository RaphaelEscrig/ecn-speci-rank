import styles from "./specialties-simulations.module.scss";
import { Suspense } from "react";
import Link from "next/link";
/** ADAPTERS */
import app from "@/modules/app/main";
/** COMPONENTS */
import SpecialtiesListingLoader from "../../components/specialties-listing-loader/specialties-listing-loader.component";
import SpecialtiesSimulationsFilters from "../../components/specialties-simulations-filters/specialties-simulations-filters.component";
/** NEXT-INTL */
import { getTranslations } from "next-intl/server";
/** USE CASES */
import { FindSpecialtiesPerSimulationUseCase } from "@/modules/specialties/core/use-cases/find-specialties-per-simulation.use-case";

const Listing = async ({ rank, stage }: { rank?: number; stage: number }) => {
	const { specialties } = await new FindSpecialtiesPerSimulationUseCase(
		app.dependencies.specialtiesGateway
	).execute({ stage, rank });
	const t = await getTranslations();

	return (
		<div className={styles.listingContainer}>
			<div className={styles.listingHead}>
				<span>{t("SpecialtiesSimulationsPage.listing-head-specialty")}</span>
				<span className={styles.assignedPlaces}>
					{t("SpecialtiesSimulationsPage.listing-head-assigned-places")}
				</span>
				<span className={styles.remainingPlaces}>
					{t("SpecialtiesSimulationsPage.listing-head-remaining-places")}
				</span>
				<span className={styles.listingContentFirstRank}>
					{t("SpecialtiesSimulationsPage.listing-head-best-rank")}
				</span>
				<span>{t("SpecialtiesSimulationsPage.listing-head-worst-rank")}</span>
				<div />
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
						<span className={styles.listingContentRowAssignedPlaces}>
							{specialty.assignedPlaces}
						</span>
						<span className={styles.listingContentRowRemainingPlaces}>
							{specialty.remainingPlaces}
						</span>
						<span className={styles.listingContentFirstRank}>
							{specialty.bestRank
								? specialty.bestRank
								: t("SpecialtiesSimulationsPage.listing-no-rank")}
						</span>
						<span className={styles.listingContentRowLastRank}>
							{specialty.worstRank
								? specialty.worstRank
								: t("SpecialtiesSimulationsPage.listing-no-rank")}
						</span>
						<Link
							href={
								rank
									? `/cities/simulations?stage=${stage}&specialty=${specialty.specialty}&rank=${rank}`
									: `/cities/simulations?stage=${stage}&specialty=${specialty.specialty}`
							}
						>
							{t("SpecialtiesSimulationsPage.listing-see-cities")}
						</Link>
					</div>
				))}
			</div>
		</div>
	);
};

const SpecialtiesSimulationsPage = ({
	stage,
	rank,
}: {
	stage: number;
	rank?: number;
}) => {
	return (
		<main id={styles.page}>
			<SpecialtiesSimulationsFilters rank={rank} stage={stage} />
			<Suspense fallback={<SpecialtiesListingLoader />}>
				<Listing rank={rank} stage={stage} />
			</Suspense>
		</main>
	);
};

export default SpecialtiesSimulationsPage;
