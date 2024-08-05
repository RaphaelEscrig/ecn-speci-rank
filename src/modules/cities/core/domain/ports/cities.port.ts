/** MODELS */
import type {
	CityRank,
	CitySimulation,
} from "@/modules/cities/core/domain/models";
import type { SpecialtyCode } from "@/modules/shared/domain/models";

export interface ICitiesGateway {
	find(
		rank: number,
		specialty: SpecialtyCode,
		year: number
	): Promise<CityRank.City[]>;

	findPerSimulation(
		rank: number,
		specialty: SpecialtyCode,
		stage: number
	): Promise<CitySimulation.City[]>;
}
