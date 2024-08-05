/** MODELS */
import type { SpecialtyCode } from "@/modules/shared/domain/models";
import type {
	Specialty,
	SpecialtyRanking,
	SpecialtySimulation,
} from "@/modules/specialties/core/domain/models/index";

export interface ISpecialtiesGateway {
	findAllPerYear(year: number): Promise<Specialty.PerYear[]>;

	findAllPerSimulation(
		stage: number
	): Promise<SpecialtySimulation.PerSpecialty[]>;

	findRanking(
		specialty: SpecialtyCode,
		year: number
	): Promise<SpecialtyRanking.Rank[]>;
}
