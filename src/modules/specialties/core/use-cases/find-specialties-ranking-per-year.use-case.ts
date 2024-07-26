/** MODELS */
import type { SpecialtyCode } from "@/modules/shared/domain/models";
import type { SpecialtyRanking } from "../domain/models";
/** PORTS */
import type { ISpecialtiesGateway } from "../domain/ports/specialties.port";

type Request = {
	readonly year: number;
	readonly specialty: SpecialtyCode;
};

type Response = {
	readonly ranking: SpecialtyRanking.Rank[];
};

export class FindSpecialtiesRankingPerYearUseCase {
	constructor(private readonly gateway: ISpecialtiesGateway) {}

	public async execute({ year, specialty }: Request): Promise<Response> {
		try {
			const ranking = await this.gateway.findRanking(specialty, year);

			return { ranking };
		} catch (error) {
			throw error;
		}
	}
}
