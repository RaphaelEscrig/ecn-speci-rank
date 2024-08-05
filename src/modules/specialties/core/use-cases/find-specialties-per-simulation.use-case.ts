/** MODELS */
import type { SpecialtySimulation } from "@/modules/specialties/core/domain/models";
/** PORTS */
import type { ISpecialtiesGateway } from "@/modules/specialties/core/domain/ports/specialties.port";

type Request = {
	readonly stage: number;
	readonly rank?: number;
};

type Response = {
	readonly specialties: SpecialtySimulation.PerSpecialtyWithResult[];
};

export class FindSpecialtiesPerSimulationUseCase {
	constructor(private readonly gateway: ISpecialtiesGateway) {}

	private _determinePossibility(
		specialty: SpecialtySimulation.PerSpecialty,
		rank?: number
	): SpecialtySimulation.PerSpecialtyWithResult {
		if (!rank || !specialty.bestRank || !specialty.worstRank) {
			return {
				...specialty,
				wouldHaveIt: false,
			};
		}
		if (specialty.places === 1 && specialty.bestRank < rank) {
			return {
				...specialty,
				wouldHaveIt: false,
			};
		}
		if (specialty.places > 1 && specialty.worstRank < rank) {
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

	public async execute({ stage, rank }: Request): Promise<Response> {
		try {
			const specialties = await this.gateway.findAllPerSimulation(stage);
			const specialtiesWithResult = specialties.map((specialty) =>
				this._determinePossibility(specialty, rank)
			);

			return { specialties: specialtiesWithResult };
		} catch (error) {
			throw error;
		}
	}
}
