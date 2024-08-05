/** MODELS */
import type { CitySimulation } from "@/modules/cities/core/domain/models";
import type { SpecialtyCode } from "@/modules/shared/domain/models";
/** PORTS */
import type { ICitiesGateway } from "@/modules/cities/core/domain/ports/cities.port";

type Request = {
	readonly stage: number;
	readonly rank: number;
	readonly specialty: SpecialtyCode;
};

type Response = {
	readonly cities: CitySimulation.CityWithRankResult[];
};

export class EstimateCitiesSimulationsIWouldHaveUseCase {
	constructor(private readonly gateway: ICitiesGateway) {}

	private _determinePossibility(
		city: CitySimulation.City,
		rank: number
	): CitySimulation.CityWithRankResult {
		if (!city.bestRank || !city.worstRank) {
			return {
				...city,
				wouldHaveIt: true,
			};
		}
		if (city.places === 1 && city.bestRank < rank) {
			return {
				...city,
				wouldHaveIt: false,
			};
		}
		if (city.places > 1 && city.worstRank < rank) {
			return {
				...city,
				wouldHaveIt: false,
			};
		}

		return {
			...city,
			wouldHaveIt: true,
		};
	}

	public async execute({ stage, rank, specialty }: Request): Promise<Response> {
		const cities = await this.gateway
			.findPerSimulation(rank, specialty, stage)
			.then((res) =>
				res.sort((a, b) => (a.bestRank ?? 9999) - (b.bestRank ?? 9999))
			);

		const citiesWithRankResult: CitySimulation.CityWithRankResult[] =
			cities.map((city) => {
				return this._determinePossibility(city, rank);
			});

		return {
			cities: citiesWithRankResult,
		};
	}
}
