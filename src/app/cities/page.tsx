/** PAGES */
import CitiesPage from "@/modules/cities/react/pages/cities.page";

type Props = {
	readonly searchParams?: {
		readonly year?: string;
		readonly rank?: string;
		readonly specialty?: string;
	};
};

const NextCitiesPage = ({ searchParams }: Props) => {
	return <CitiesPage />;
};

export default NextCitiesPage;
