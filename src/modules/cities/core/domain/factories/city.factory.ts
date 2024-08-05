/** MODELS */
import type {
	CityRank,
	CitySimulation,
} from "@/modules/cities/core/domain/models";

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

	public static createCitiesSimulation(): CitySimulation.City[] {
		return [
			{
				name: "Bordeaux",
				bestRank: 89,
				worstRank: 89,
				places: 1,
				assignedPlaces: 1,
				remainingPlaces: 0,
			},
			{
				name: "Reims",
				bestRank: 452,
				worstRank: 8974,
				places: 7,
				assignedPlaces: 5,
				remainingPlaces: 2,
			},
			{
				name: "Toulouse",
				bestRank: 182,
				worstRank: 182,
				places: 1,
				assignedPlaces: 1,
				remainingPlaces: 0,
			},
			{
				name: "Montpellier",
				bestRank: 387,
				worstRank: 523,
				places: 3,
				assignedPlaces: 3,
				remainingPlaces: 0,
			},
			{
				name: "Grenoble",
				bestRank: null,
				worstRank: null,
				places: 2,
				assignedPlaces: 0,
				remainingPlaces: 2,
			},
			{
				name: "Rennes",
				bestRank: null,
				worstRank: null,
				places: 1,
				assignedPlaces: 0,
				remainingPlaces: 1,
			},
			{
				name: "Strasbourg",
				bestRank: 278,
				worstRank: 897,
				places: 3,
				assignedPlaces: 3,
				remainingPlaces: 0,
			},
		];
	}
}
