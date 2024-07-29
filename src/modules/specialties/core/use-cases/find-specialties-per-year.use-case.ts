/** MODELS */
import type { Specialty } from "@/modules/specialties/core/domain/models";
/** PORTS */
import type { ISpecialtiesGateway } from "@/modules/specialties/core/domain/ports/specialties.port";

type Request = {
	readonly year: number;
	readonly rank?: number;
};

type Response = {
	readonly specialties: Specialty.PerYearWithRankResult[];
};

export class FindSpecialtiesPerYearUseCase {
	constructor(private readonly gateway: ISpecialtiesGateway) {}

	private _determinePossibility(
		specialty: Specialty.PerYear,
		rank?: number
	): Specialty.PerYearWithRankResult {
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

	public async execute({ year, rank }: Request): Promise<Response> {
		try {
			const specialties = await this.gateway.findAllPerYear(year);
			const specialtiesWithRank = specialties.map((specialty) =>
				this._determinePossibility(specialty, rank)
			);

			return { specialties: specialtiesWithRank };
		} catch (error) {
			throw error;
		}
	}
}
