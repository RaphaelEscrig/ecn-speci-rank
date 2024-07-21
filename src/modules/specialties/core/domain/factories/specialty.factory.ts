/** MODELS */
import type { Specialty } from "@/modules/specialties/core/domain/models";

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
}
