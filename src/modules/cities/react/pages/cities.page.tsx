import styles from "./cities.module.scss";
/** COMPONENTS */
import CitiesRankForm from "@/modules/cities/react/components/cities-rank-form/cities-rank-form.component";
import CitiesListingLoader from "../components/cities-listing-loader/cities-listing-loader.component";
/** MODELS */
import type { SpecialtyCode } from "@/modules/shared/domain/models";
import { Suspense } from "react";
import { EstimateCitiesIWouldHaveUseCase } from "../../core/use-cases/estimate-cities-i-would-have.use-case";
import app from "@/modules/app/main";
/** NEXT-INTL */
import { getTranslations } from "next-intl/server";

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
	return (
		<main id={styles.page}>
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
		</main>
	);
};

export default CitiesPage;
