import ranksPerCity2023 from "../../../../../data/2023_ranks.json";
import ranksPerCity2022 from "../../../../../data/2022_ranks.json";
import ranksPerCity2020 from "../../../../../data/2020_ranks.json";
import ranksPerCity2019 from "../../../../../data/2019_ranks.json";

type RankPerSpecialtyPerCity = {
	readonly city: string;
	readonly specialty: string | null;
	readonly bestRank: number;
	readonly worstRank: number;
	readonly available: number;
	readonly asked: number;
	readonly fulfilled: number;
};

type RankResult = {
	readonly city: string;
	readonly wouldHaveIt: boolean;
	readonly bestRank: number;
	readonly worstRank: number;
	readonly myRank: number;
	readonly places: number;
};

export class EstimateCitiesUseCase {
	private _getRanksPerCity(year: number): RankPerSpecialtyPerCity[] {
		if (year === 2019) {
			return ranksPerCity2019 as RankPerSpecialtyPerCity[];
		}
		if (year === 2020) {
			return ranksPerCity2020 as RankPerSpecialtyPerCity[];
		}
		if (year === 2022) {
			return ranksPerCity2022 as RankPerSpecialtyPerCity[];
		}
		return ranksPerCity2023 as RankPerSpecialtyPerCity[];
	}

	public execute({
		rank,
		specialty,
		year,
	}: {
		rank: number;
		specialty: string;
		year: number;
	}): {
		readonly cities: Array<RankResult>;
	} {
		const ranksPerCity = this._getRanksPerCity(year);
		let citiesRanks: RankPerSpecialtyPerCity[] = [];

		ranksPerCity.forEach((cityRank) => {
			if (cityRank.specialty === specialty) {
				citiesRanks.push(cityRank as RankPerSpecialtyPerCity);
			}
		});

		citiesRanks = citiesRanks.sort((a, b) => a.bestRank - b.bestRank);

		const resultCities = citiesRanks.map((city): RankResult => {
			let wouldHaveIt = false;

			if (
				city.bestRank !== null &&
				city.worstRank !== null &&
				(city.bestRank > rank || city.worstRank > rank)
			) {
				wouldHaveIt = true;
			}

			return {
				city: city.city,
				wouldHaveIt,
				bestRank: city.bestRank,
				worstRank: city.worstRank,
				myRank: rank,
				places: city.fulfilled,
			};
		});

		return { cities: resultCities };
	}
}
