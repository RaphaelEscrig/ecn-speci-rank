import styles from "./cities.module.scss";
import { Suspense } from "react";
import Link from "next/link";
/** APP */
import app from "@/modules/app/main";
/** COMPONENTS */
import CitiesRankForm from "@/modules/cities/react/components/cities-rank-form/cities-rank-form.component";
import CitiesListingLoader from "@/modules/cities/react/components/cities-listing-loader/cities-listing-loader.component";
/** MODELS */
import type { SpecialtyCode } from "@/modules/shared/domain/models";
/** NEXT-INTL */
import { getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
/** REACT FEATHER */
import { ArrowLeft } from "react-feather";
/** USE CASES */
import { EstimateCitiesIWouldHaveUseCase } from "@/modules/cities/core/use-cases/estimate-cities-i-would-have.use-case";

type Props = {
	readonly year?: number;
	readonly rank?: number;
	readonly specialty?: SpecialtyCode;
};

const Listing = async ({
	year,
	rank,
	specialty,
}: {
	readonly year: number;
	readonly rank: number;
	readonly specialty: SpecialtyCode;
}) => {
	const t = await getTranslations();
	const { cities } = await new EstimateCitiesIWouldHaveUseCase(
		app.dependencies.citiesGateway
	).execute({
		year,
		rank,
		specialty,
	});

	return (
		<div className={styles.listingContainer}>
			<div className={styles.listingHead}>
				<span>{t("CitiesRankListing.listing-head-city")}</span>
				<span>{t("CitiesRankListing.listing-head-result")}</span>
				<span>{t("CitiesRankListing.listing-head-places")}</span>
				<span className={styles.listingContentFirstRank}>
					{t("CitiesRankListing.listing-head-best-rank")}
				</span>
				<span className={styles.listingContentMyRank}>
					{t("CitiesRankListing.listing-head-my-rank")}
				</span>
				<span>{t("CitiesRankListing.listing-head-worst-rank")}</span>
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
								<span>{t("CitiesRankListing.listing-result-success")}</span>
							) : (
								<span>{t("CitiesRankListing.listing-result-failed")}</span>
							)}
						</div>
						<span className={styles.listingContentRowPlaces}>
							{city.places}
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

const CitiesPage = ({ year, rank, specialty }: Props) => {
	const t = useTranslations();

	return (
		<main id={styles.page}>
			<Link
				className={styles.goBack}
				href={
					rank
						? `/specialties?year=${year}&rank=${rank}`
						: `/specialties?year=${year}`
				}
			>
				<ArrowLeft />
				<span>{t("CitiesRankListing.go-to-specialties-listing")}</span>
			</Link>

			<CitiesRankForm
				rank={rank?.toString()}
				specialty={specialty}
				year={year?.toString()}
			/>

			{year && rank && specialty && (
				<Suspense fallback={<CitiesListingLoader />}>
					<Listing rank={rank} specialty={specialty} year={year} />
				</Suspense>
			)}

			{!rank && <p>{t("CitiesRankListing.no-rank-specified")}</p>}
			{!year && <p>{t("CitiesRankListing.no-year-selected")}</p>}
			{!specialty && <p>{t("CitiesRankListing.no-specialty-selected")}</p>}
		</main>
	);
};

export default CitiesPage;
