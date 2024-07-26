/** MODELS */
import type { SpecialtyCode } from "@/modules/shared/domain/models";
import type {
	Specialty,
	SpecialtyRanking,
} from "@/modules/specialties/core/domain/models/index";

export interface ISpecialtiesGateway {
	findAllPerYear(year: number): Promise<Specialty.PerYear[]>;

	findRanking(
		specialty: SpecialtyCode,
		year: number
	): Promise<SpecialtyRanking.Rank[]>;
}
