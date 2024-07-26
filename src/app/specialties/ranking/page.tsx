/** CONSTANTS */
import { SPECIALTIES_LISTING_MAX_YEAR } from "@/modules/specialties/core/domain/constants";
/** MODELS */
import type { SpecialtyCode } from "@/modules/shared/domain/models";
/** PAGES */
import SpecialtiesRankingPage from "@/modules/specialties/react/pages/ranking/specialties-ranking.page";
/** UTILS */
import { isValidSpecialty } from "@/modules/shared/utils/specialty.util";

type Props = {
	readonly searchParams?: {
		readonly year?: string;
		readonly specialty?: string;
	};
};

export default async function NextSpecialtiesRankingPage({
	searchParams,
}: Props) {
	const year = searchParams?.year
		? parseInt(searchParams.year)
		: SPECIALTIES_LISTING_MAX_YEAR;
	const specialty =
		searchParams?.specialty && isValidSpecialty(searchParams.specialty)
			? (searchParams.specialty as SpecialtyCode)
			: undefined;

	return <SpecialtiesRankingPage specialty={specialty} year={year} />;
}
