/** PAGES */
import SpecialtiesBlankRoundsPage from "@/modules/specialties/react/pages/blank-rounds/specialties-blank-rounds.page";

type Props = {
	readonly searchParams?: {
		readonly round?: string;
		readonly rank?: string;
	};
};

export default async function NextWhiteRoundsPage({ searchParams }: Props) {
	const round = searchParams?.round ? parseInt(searchParams.round) : 1;
	const rank = searchParams?.rank ? parseInt(searchParams.rank) : undefined;

	return <SpecialtiesBlankRoundsPage rank={rank} round={round} />;
}
