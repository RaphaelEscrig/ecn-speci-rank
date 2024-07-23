/** MODELS */
import type { CityRank } from "@/modules/cities/core/domain/models";

export class CityFactory {
	public static createCities(): CityRank.City[] {
		return [
			{
				name: "Bordeaux",
				bestRank: 89,
				worstRank: 89,
				places: 1,
			},
			{
				name: "Reims",
				bestRank: 452,
				worstRank: 8974,
				places: 7,
			},
			{
				name: "Toulouse",
				bestRank: 182,
				worstRank: 182,
				places: 1,
			},
			{
				name: "Montpellier",
				bestRank: 387,
				worstRank: 523,
				places: 3,
			},
			{
				name: "Grenoble",
				bestRank: 17,
				worstRank: 3782,
				places: 2,
			},
			{
				name: "Rennes",
				bestRank: 451,
				worstRank: 451,
				places: 1,
			},
			{
				name: "Strasbourg",
				bestRank: 278,
				worstRank: 897,
				places: 3,
			},
		];
	}
}
