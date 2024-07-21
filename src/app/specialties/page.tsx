/** PAGES */
import SpecialtiesListingPage from "@/modules/specialties/react/pages/listing/specialties-listing.page";

type Props = {
	readonly searchParams?: {
		readonly year?: string;
	};
};

// export const revalidate = 3600; // revalidate the data at most every hour

export default async function NextSpecialtiesPages({ searchParams }: Props) {
	const year = searchParams?.year ? parseInt(searchParams.year) : 2023;

	return <SpecialtiesListingPage year={year} />;
}
