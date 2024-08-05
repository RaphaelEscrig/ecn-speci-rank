import styles from "./cities-simulations.module.scss";
import { Suspense } from "react";
import Link from "next/link";
/** APP */
import app from "@/modules/app/main";
/** COMPONENTS */
import CitiesSimulationForm from "@/modules/cities/react/components/cities-simulation-form/cities-simulation-form.component";
import CitiesListingLoader from "@/modules/cities/react/components/cities-listing-loader/cities-listing-loader.component";
/** MODELS */
import type { SpecialtyCode } from "@/modules/shared/domain/models";
/** NEXT-INTL */
import { getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
/** REACT FEATHER */
import { ArrowLeft } from "react-feather";
/** USE CASES */
import { EstimateCitiesSimulationsIWouldHaveUseCase } from "@/modules/cities/core/use-cases/estimate-cities-simulations-i-would-have.use-case";

type Props = {
	readonly stage?: number;
	readonly rank?: number;
	readonly specialty?: SpecialtyCode;
};

const Listing = async ({
	stage,
	rank,
	specialty,
}: {
	readonly stage: number;
	readonly rank: number;
	readonly specialty: SpecialtyCode;
}) => {
	const t = await getTranslations();
	const { cities } = await new EstimateCitiesSimulationsIWouldHaveUseCase(
		app.dependencies.citiesGateway
	).execute({
		stage,
		rank,
		specialty,
	});

	return (
		<div className={styles.listingContainer}>
			<div className={styles.listingHead}>
				<span>{t("CitiesSimulationListing.listing-head-city")}</span>
				<span>{t("CitiesSimulationListing.listing-head-result")}</span>
				<span className={styles.assignedPlaces}>
					{t("CitiesSimulationListing.listing-head-assigned-places")}
				</span>
				<span className={styles.remainingPlaces}>
					{t("CitiesSimulationListing.listing-head-remaining-places")}
				</span>
				<span className={styles.listingContentFirstRank}>
					{t("CitiesSimulationListing.listing-head-best-rank")}
				</span>
				<span className={styles.listingContentMyRank}>
					{t("CitiesSimulationListing.listing-head-my-rank")}
				</span>
				<span>{t("CitiesSimulationListing.listing-head-worst-rank")}</span>
			</div>

			<div className={styles.listingContent}>
				{cities.map((city, index) => (
					<div
						key={index}
						className={styles.listingContentRow}
						data-would-have-it={city.wouldHaveIt}
					>
						<div className={styles.listingContentRowCity}>
							<span>{city.name}</span>
						</div>
						<div>
							{city.wouldHaveIt ? (
								<span>
									{t("CitiesSimulationListing.listing-result-success")}
								</span>
							) : (
								<span>
									{t("CitiesSimulationListing.listing-result-failed")}
								</span>
							)}
						</div>
						<span className={styles.listingContentRowAssignedPlaces}>
							{city.assignedPlaces}
						</span>
						<span className={styles.listingContentRowRemainingPlaces}>
							{city.remainingPlaces}
						</span>
						<span className={styles.listingContentFirstRank}>
							{city.bestRank}
						</span>
						<span className={styles.listingContentMyRank}>{rank}</span>
						<span className={styles.listingContentRowLastRank}>
							{city.worstRank}
						</span>
					</div>
				))}
			</div>
		</div>
	);
};

const CitiesSimulationsPage = ({ stage, rank, specialty }: Props) => {
	const t = useTranslations();

	return (
		<main id={styles.page}>
			<Link
				className={styles.goBack}
				href={
					rank
						? `/specialties/simulations?stage=${stage}&rank=${rank}`
						: `/specialties/simulations?stage=${stage}`
				}
			>
				<ArrowLeft />
				<span>{t("CitiesSimulationListing.go-to-specialties-listing")}</span>
			</Link>

			<CitiesSimulationForm
				rank={rank?.toString()}
				specialty={specialty}
				stage={stage?.toString()}
			/>

			{stage && rank && specialty && (
				<Suspense fallback={<CitiesListingLoader />}>
					<Listing rank={rank} specialty={specialty} stage={stage} />
				</Suspense>
			)}
		</main>
	);
};

export default CitiesSimulationsPage;
