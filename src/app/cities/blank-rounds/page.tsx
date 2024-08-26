/** MODELS */
import type { SpecialtyCode } from "@/modules/shared/domain/models";
/** PAGES */
import CitiesBlankRoundsPage from "@/modules/cities/react/pages/blank-rounds/blank-rounds.page";
/** UTILS */
import { isValidSpecialty } from "@/modules/shared/utils/specialty.util";

type Props = {
	readonly searchParams?: {
		readonly round?: string;
		readonly rank?: string;
		readonly specialty?: string;
	};
};

const NextCitiesBlankRoundsPage = ({ searchParams }: Props) => {
	const round = searchParams?.round ? parseInt(searchParams.round) : undefined;
	const rank = searchParams?.rank ? parseInt(searchParams.rank) : undefined;
	const specialty =
		searchParams?.specialty && isValidSpecialty(searchParams.specialty)
			? (searchParams.specialty as SpecialtyCode)
			: undefined;

	return (
		<CitiesBlankRoundsPage rank={rank} round={round} specialty={specialty} />
	);
};

export default NextCitiesBlankRoundsPage;
