/** MODELS */
import type { Specialty } from "@/modules/specialties/core/domain/models";

export class SpecialtyFactory {
	public static createSpecialtiesPerYear(): Specialty.PerYear[] {
		return [
			{
				code: "CMF",
				places: 21,
				bestRank: 89,
				worstRank: 1800,
			},
			{
				code: "ACP",
				places: 89,
				bestRank: 789,
				worstRank: 4689,
			},
			{
				code: "RHU",
				places: 33,
				bestRank: 145,
				worstRank: 3895,
			},
			{
				code: "ATT",
				places: 21,
				bestRank: 89,
				worstRank: 1800,
			},
			{
				code: "COR",
				places: 89,
				bestRank: 789,
				worstRank: 4689,
			},
			{
				code: "URO",
				places: 33,
				bestRank: 145,
				worstRank: 3895,
			},
			{
				code: "PSY",
				places: 128,
				bestRank: 789,
				worstRank: 7893,
			},
			{
				code: "PED",
				places: 89,
				bestRank: 789,
				worstRank: 4689,
			},
			{
				code: "CTC",
				places: 33,
				bestRank: 145,
				worstRank: 3895,
			},
			{
				code: "NEU",
				places: 21,
				bestRank: 89,
				worstRank: 1800,
			},
			{
				code: "CVA",
				places: 89,
				bestRank: 789,
				worstRank: 4689,
			},
			{
				code: "MLE",
				places: 33,
				bestRank: 145,
				worstRank: 3895,
			},
		];
	}
}
