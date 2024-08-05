/** MODELS */
import type { SpecialtyCode } from "@/modules/shared/domain/models";
/** PAGES */
import CitiesSimulationsPage from "@/modules/cities/react/pages/simulations/cities-simulations.page";
/** UTILS */
import { isValidSpecialty } from "@/modules/shared/utils/specialty.util";

type Props = {
	readonly searchParams?: {
		readonly stage?: string;
		readonly rank?: string;
		readonly specialty?: string;
	};
};

const NextCitiesSimulationsPage = ({ searchParams }: Props) => {
	const stage = searchParams?.stage ? parseInt(searchParams.stage) : undefined;
	const rank = searchParams?.rank ? parseInt(searchParams.rank) : undefined;
	const specialty =
		searchParams?.specialty && isValidSpecialty(searchParams.specialty)
			? (searchParams.specialty as SpecialtyCode)
			: undefined;

	return (
		<CitiesSimulationsPage rank={rank} specialty={specialty} stage={stage} />
	);
};

export default NextCitiesSimulationsPage;
