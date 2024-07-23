/** MODELS */
import type { CityRank } from "../domain/models";
import type { SpecialtyCode } from "@/modules/shared/domain/models";
/** PORTS */
import type { ICitiesGateway } from "../domain/ports/cities.port";

type Request = {
	readonly year: number;
	readonly rank: number;
	readonly specialty: SpecialtyCode;
};

type Response = {
	readonly cities: CityRank.CityWithRankResult[];
};

export class EstimateCitiesIWouldHaveUseCase {
	constructor(private readonly gateway: ICitiesGateway) {}

	private _determinePossibility(
		city: CityRank.City,
		rank: number
	): CityRank.CityWithRankResult {
		if (!city.bestRank || !city.worstRank) {
			return {
				...city,
				wouldHaveIt: false,
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

	public async execute({ year, rank, specialty }: Request): Promise<Response> {
		const cities = await this.gateway
			.find(rank, specialty, year)
			.then((res) => res.sort((a, b) => a.bestRank - b.bestRank));

		const citiesWithRankResult: CityRank.CityWithRankResult[] = cities.map(
			(city) => {
				return this._determinePossibility(city, rank);
			}
		);

		return {
			cities: citiesWithRankResult,
		};
	}
}
