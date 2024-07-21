/** MODELS */
import type { SpecialtyCode } from "@/modules/shared/domain/models";
/** PAGES */
import CitiesPage from "@/modules/cities/react/pages/cities.page";
/** UTILS */
import { isValidSpecialty } from "@/modules/shared/utils/specialty.util";

type Props = {
	readonly searchParams?: {
		readonly year?: string;
		readonly rank?: string;
		readonly specialty?: string;
	};
};

const NextCitiesPage = ({ searchParams }: Props) => {
	const year = searchParams?.year ? parseInt(searchParams.year) : undefined;
	const rank = searchParams?.rank ? parseInt(searchParams.rank) : undefined;
	const specialty =
		searchParams?.specialty && isValidSpecialty(searchParams.specialty)
			? (searchParams.specialty as SpecialtyCode)
			: undefined;

	return <CitiesPage rank={rank} specialty={specialty} year={year} />;
};

export default NextCitiesPage;
