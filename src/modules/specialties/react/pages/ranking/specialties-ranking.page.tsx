import styles from "./specialties-ranking.module.scss";
import { Suspense } from "react";
import Link from "next/link";
/** ADAPTERS */
import app from "@/modules/app/main";
/** COMPONENTS */
import SpecialtiesListingLoader from "../../components/specialties-listing-loader/specialties-listing-loader.component";
import SpecialtiesRankingFilters from "../../components/specialties-ranking-filters/specialties-ranking-filters.component";
/** MODELS */
import type { SpecialtyCode } from "@/modules/shared/domain/models";
/** NEXT-INTL */
import { getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
/** REACT FEATHER */
import { ArrowLeft } from "react-feather";
/** USE CASES */
import { FindSpecialtiesRankingPerYearUseCase } from "@/modules/specialties/core/use-cases/find-specialties-ranking-per-year.use-case";

const Listing = async ({
	specialty,
	year,
}: {
	specialty: SpecialtyCode;
	year: number;
}) => {
	const { ranking } = await new FindSpecialtiesRankingPerYearUseCase(
		app.dependencies.specialtiesGateway
	).execute({ specialty, year });
	const t = await getTranslations();

	return (
		<div className={styles.listingContainer}>
			<div className={styles.listingHead}>
				<span>{t("SpecialtiesRankingPage.listing-head-rank")}</span>
				<span>{t("SpecialtiesRankingPage.listing-head-intern")}</span>
				<span>{t("SpecialtiesRankingPage.listing-head-city")}</span>
			</div>

			<div className={styles.listingContent}>
				{ranking.map((item, index) => (
					<div key={index} className={styles.listingContentRow}>
						<span>{item.rank}</span>
						<span>{item.intern}</span>
						<span>{item.city}</span>
					</div>
				))}
			</div>
		</div>
	);
};

const GoToSpecialties = ({
	year,
}: {
	year: number;
	specialty?: SpecialtyCode;
}) => {
	const t = useTranslations();

	const getLink = (): string => {
		if (year) {
			return `/specialties?year=${year}`;
		}

		return "/specialties";
	};

	const link = getLink();

	return (
		<Link className={styles.goToSpecialties} href={link}>
			<ArrowLeft />
			<span>{t("SpecialtiesRankingPage.go-to-specialties-listing")}</span>
		</Link>
	);
};

const SpecialtiesRankingPage = ({
	year,
	specialty,
}: {
	year: number;
	specialty?: SpecialtyCode;
}) => {
	return (
		<main id={styles.page}>
			<GoToSpecialties year={year} />
			<SpecialtiesRankingFilters specialty={specialty} year={year} />
			{specialty && year && (
				<Suspense fallback={<SpecialtiesListingLoader />}>
					<Listing specialty={specialty} year={year} />
				</Suspense>
			)}
		</main>
	);
};

export default SpecialtiesRankingPage;
