/** PAGES */
import SpecialtiesListingPage from "@/modules/specialties/react/pages/listing/specialties-listing.page";

type Props = {
	readonly searchParams?: {
		readonly year?: string;
		readonly rank?: string;
	};
};

export default async function NextSpecialtiesPage({ searchParams }: Props) {
	const year = searchParams?.year ? parseInt(searchParams.year) : 2023;
	const rank = searchParams?.rank ? parseInt(searchParams.rank) : undefined;

	return <SpecialtiesListingPage rank={rank} year={year} />;
}
