import styles from "@/modules/cities/react/pages/blank-rounds/blank-rounds.module.scss";
import { Suspense } from "react";
import Link from "next/link";
/** APP */
import app from "@/modules/app/main";
/** COMPONENTS */
import CitiesBlankRoundsForm from "@/modules/cities/react/components/cities-blank-rounds-form/cities-blank-rounds-form.component";
import CitiesListingLoader from "@/modules/cities/react/components/cities-listing-loader/cities-listing-loader.component";
/** MODELS */
import type { SpecialtyCode } from "@/modules/shared/domain/models";
/** NEXT-INTL */
import { getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
/** REACT FEATHER */
import { ArrowLeft } from "react-feather";
/** USE CASES */
import { EstimateCitiesBlankRoundsIWouldHaveUseCase } from "@/modules/cities/core/use-cases/estimate-cities-blank-rounds-i-would-have.use-case";

type Props = {
	readonly round?: number;
	readonly rank?: number;
	readonly specialty?: SpecialtyCode;
};

const Listing = async ({
	round,
	rank,
	specialty,
}: {
	readonly round: number;
	readonly rank: number;
	readonly specialty: SpecialtyCode;
}) => {
	const t = await getTranslations();
	const { cities } = await new EstimateCitiesBlankRoundsIWouldHaveUseCase(
		app.dependencies.citiesGateway
	).execute({
		round,
		rank,
		specialty,
	});

	return (
		<div className={styles.listingContainer}>
			<div className={styles.listingHead}>
				<span>{t("CitiesBlankRoundsListing.listing-head-city")}</span>
				<span>{t("CitiesBlankRoundsListing.listing-head-result")}</span>
				<span className={styles.assignedPlaces}>
					{t("CitiesBlankRoundsListing.listing-head-assigned-places")}
				</span>
				<span className={styles.remainingPlaces}>
					{t("CitiesBlankRoundsListing.listing-head-remaining-places")}
				</span>
				<span className={styles.listingContentFirstRank}>
					{t("CitiesBlankRoundsListing.listing-head-best-rank")}
				</span>
				<span className={styles.listingContentMyRank}>
					{t("CitiesBlankRoundsListing.listing-head-my-rank")}
				</span>
				<span>{t("CitiesBlankRoundsListing.listing-head-worst-rank")}</span>
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
									{t("CitiesBlankRoundsListing.listing-result-success")}
								</span>
							) : (
								<span>
									{t("CitiesBlankRoundsListing.listing-result-failed")}
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
							{city.bestRank
								? city.bestRank
								: t("SpecialtiesSimulationsPage.listing-no-rank")}
						</span>
						<span className={styles.listingContentMyRank}>{rank}</span>
						<span className={styles.listingContentRowLastRank}>
							{city.worstRank
								? city.worstRank
								: t("SpecialtiesSimulationsPage.listing-no-rank")}
						</span>
					</div>
				))}
			</div>
		</div>
	);
};

const CitiesBlankRoundsPage = ({ round, rank, specialty }: Props) => {
	const t = useTranslations();

	return (
		<main id={styles.page}>
			<Link
				className={styles.goBack}
				href={
					rank
						? `/specialties/blank-rounds?round=${round}&rank=${rank}`
						: `/specialties/blank-rounds?round=${round}`
				}
			>
				<ArrowLeft />
				<span>{t("CitiesBlankRoundsListing.go-to-specialties-listing")}</span>
			</Link>

			<CitiesBlankRoundsForm
				rank={rank?.toString()}
				round={round?.toString()}
				specialty={specialty}
			/>

			{round && rank && specialty && (
				<Suspense fallback={<CitiesListingLoader />}>
					<Listing rank={rank} round={round} specialty={specialty} />
				</Suspense>
			)}

			{!rank && <p>{t("CitiesBlankRoundsListing.no-rank-specified")}</p>}
			{!round && <p>{t("CitiesBlankRoundsListing.no-round-selected")}</p>}
			{!specialty && (
				<p>{t("CitiesBlankRoundsListing.no-specialty-selected")}</p>
			)}
		</main>
	);
};

export default CitiesBlankRoundsPage;
