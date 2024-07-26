/** MODELS */
import type { SpecialtyCode } from "@/modules/shared/domain/models";
import type {
	Specialty,
	SpecialtyRanking,
} from "@/modules/specialties/core/domain/models";

export class SpecialtyFactory {
	public static createSpecialtiesPerYear(): Specialty.PerYear[] {
		return [
			{
				specialty: "CMF",
				places: 21,
				bestRank: 89,
				worstRank: 1800,
			},
			{
				specialty: "ACP",
				places: 89,
				bestRank: 789,
				worstRank: 4689,
			},
			{
				specialty: "RHU",
				places: 33,
				bestRank: 145,
				worstRank: 3895,
			},
			{
				specialty: "ATT",
				places: 21,
				bestRank: 89,
				worstRank: 1800,
			},
			{
				specialty: "COR",
				places: 89,
				bestRank: 789,
				worstRank: 4689,
			},
			{
				specialty: "URO",
				places: 33,
				bestRank: 145,
				worstRank: 3895,
			},
			{
				specialty: "PSY",
				places: 128,
				bestRank: 789,
				worstRank: 7893,
			},
			{
				specialty: "PED",
				places: 89,
				bestRank: 789,
				worstRank: 4689,
			},
			{
				specialty: "CTC",
				places: 33,
				bestRank: 145,
				worstRank: 3895,
			},
			{
				specialty: "NEU",
				places: 21,
				bestRank: 89,
				worstRank: 1800,
			},
			{
				specialty: "CVA",
				places: 89,
				bestRank: 789,
				worstRank: 4689,
			},
			{
				specialty: "MLE",
				places: 33,
				bestRank: 145,
				worstRank: 3895,
			},
		];
	}

	public static createSpecialtyRankingPerYear(
		specialty: SpecialtyCode = "CMF",
		year = 2023
	): SpecialtyRanking.Rank[] {
		return [
			{
				specialty,
				year,
				rank: 1,
				intern: "John Doe",
				city: "Bordeaux",
			},
			{
				specialty,
				year,
				rank: 2,
				intern: "Jhin Dil",
				city: "Strasbourg",
			},
			{
				specialty,
				year,
				rank: 3,
				intern: "Lula Yuj",
				city: "Rennes",
			},
			{
				specialty,
				year,
				rank: 4,
				intern: "Mast Bard",
				city: "Amiens",
			},
			{
				specialty,
				year,
				rank: 5,
				intern: "Roat Bzar",
				city: "Montpellier",
			},
			{
				specialty,
				year,
				rank: 6,
				intern: "Basil Lud",
				city: "Rennes",
			},
			{
				specialty,
				year,
				rank: 7,
				intern: "Rita Ota",
				city: "Grenoble",
			},
			{
				specialty,
				year,
				rank: 8,
				intern: "Yan Jurd",
				city: "Clermont-Ferrand",
			},
		];
	}
}
