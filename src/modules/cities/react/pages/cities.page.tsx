/** COMPONENTS */
import CitiesRankForm from "@/modules/cities/react/components/cities-rank-form/cities-rank-form.component";
/** MODELS */
import type { SpecialtyCode } from "@/modules/shared/domain/models";

type Props = {
	readonly year?: number;
	readonly rank?: number;
	readonly specialty?: SpecialtyCode;
};

const CitiesPage = ({ year, rank, specialty }: Props) => {
	return (
		<main>
			<CitiesRankForm
				rank={rank?.toString()}
				specialty={specialty}
				year={year?.toString()}
			/>
		</main>
	);
};

export default CitiesPage;
