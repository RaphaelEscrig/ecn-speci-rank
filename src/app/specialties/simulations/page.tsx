/** PAGES */
import SpecialtiesSimulationsPage from "@/modules/specialties/react/pages/simulations/specialties-simulations.page";

type Props = {
	readonly searchParams?: {
		readonly stage?: string;
		readonly rank?: string;
	};
};

export default async function NextSpecialtiesPage({ searchParams }: Props) {
	const stage = searchParams?.stage ? parseInt(searchParams.stage) : 1;
	const rank = searchParams?.rank ? parseInt(searchParams.rank) : undefined;

	return <SpecialtiesSimulationsPage rank={rank} stage={stage} />;
}
