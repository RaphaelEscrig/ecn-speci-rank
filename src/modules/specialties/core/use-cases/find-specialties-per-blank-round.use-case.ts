/** MODELS */
import type { SpecialtyBlankRound } from "@/modules/specialties/core/domain/models";
/** PORTS */
import type { ISpecialtiesGateway } from "@/modules/specialties/core/domain/ports/specialties.port";

type Request = {
	readonly round: number;
	readonly rank?: number;
};

type Response = {
	readonly specialties: SpecialtyBlankRound.PerSpecialtyWithResult[];
};

export class FindSpecialtiesPerBlankRoundUseCase {
	constructor(private readonly gateway: ISpecialtiesGateway) {}

	private _determinePossibility(
		specialty: SpecialtyBlankRound.PerSpecialty,
		rank?: number
	): SpecialtyBlankRound.PerSpecialtyWithResult {
		if (!rank) {
			return {
				...specialty,
				wouldHaveIt: false,
			};
		}
		if (specialty.places > 1 && (!specialty.bestRank || !specialty.worstRank)) {
			return {
				...specialty,
				wouldHaveIt: true,
			};
		}
		if (
			specialty.places === 1 &&
			specialty.bestRank &&
			specialty.bestRank < rank
		) {
			return {
				...specialty,
				wouldHaveIt: false,
			};
		}
		if (
			specialty.places > 1 &&
			specialty.worstRank &&
			specialty.worstRank < rank
		) {
			return {
				...specialty,
				wouldHaveIt: false,
			};
		}

		return {
			...specialty,
			wouldHaveIt: true,
		};
	}

	public async execute({ round, rank }: Request): Promise<Response> {
		try {
			const specialties = await this.gateway.findAllPerSimulation(round);
			const specialtiesWithResult = specialties.map((specialty) =>
				this._determinePossibility(specialty, rank)
			);

			return { specialties: specialtiesWithResult };
		} catch (error) {
			throw error;
		}
	}
}
