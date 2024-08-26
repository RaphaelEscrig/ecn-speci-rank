/** MODELS */
import type { CityBlankRound } from "@/modules/cities/core/domain/models";
import type { SpecialtyCode } from "@/modules/shared/domain/models";
/** PORTS */
import type { ICitiesGateway } from "@/modules/cities/core/domain/ports/cities.port";

type Request = {
	readonly round: number;
	readonly rank: number;
	readonly specialty: SpecialtyCode;
};

type Response = {
	readonly cities: CityBlankRound.CityWithRankResult[];
};

export class EstimateCitiesBlankRoundsIWouldHaveUseCase {
	constructor(private readonly gateway: ICitiesGateway) {}

	private _determinePossibility(
		city: CityBlankRound.City,
		rank: number
	): CityBlankRound.CityWithRankResult {
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

	public async execute({ round, rank, specialty }: Request): Promise<Response> {
		const cities = await this.gateway
			.findPerBlankRound(rank, specialty, round)
			.then((res) =>
				res.sort((a, b) => (a.bestRank ?? 9999) - (b.bestRank ?? 9999))
			);

		const citiesWithRankResult: CityBlankRound.CityWithRankResult[] =
			cities.map((city) => {
				return this._determinePossibility(city, rank);
			});

		return {
			cities: citiesWithRankResult,
		};
	}
}
