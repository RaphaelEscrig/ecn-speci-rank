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

	public async execute({ year, rank, specialty }: Request): Promise<Response> {
		const cities = await this.gateway
			.find(rank, specialty, year)
			.then((res) => res.sort((a, b) => a.bestRank - b.bestRank));

		const citiesWithRankResult: CityRank.CityWithRankResult[] = cities.map(
			(city) => {
				let wouldHaveIt = false;

				if (
					city.bestRank !== null &&
					city.worstRank !== null &&
					(city.bestRank > rank || city.worstRank > rank)
				) {
					wouldHaveIt = true;
				}

				return {
					name: city.name,
					wouldHaveIt,
					bestRank: city.bestRank,
					worstRank: city.worstRank,
					places: city.places,
				};
			}
		);

		return {
			cities: citiesWithRankResult,
		};
	}
}
