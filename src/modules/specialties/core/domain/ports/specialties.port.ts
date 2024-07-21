/** MODELS */
import type { Specialty } from "@/modules/specialties/core/domain/models/index";

export interface ISpecialtiesGateway {
	findAllPerYear(year: number): Promise<Specialty.PerYear[]>;
}
