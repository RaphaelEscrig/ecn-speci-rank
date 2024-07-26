/** MODELS */
import type { SpecialtyCode } from "@/modules/shared/domain/models";
import type {
	Specialty,
	SpecialtyRanking,
} from "@/modules/specialties/core/domain/models";
/** PORTS */
import type { ISpecialtiesGateway } from "@/modules/specialties/core/domain/ports/specialties.port";

export class MockFailingSpecialtiesGateway implements ISpecialtiesGateway {
	public async findAllPerYear(_: number): Promise<Specialty.PerYear[]> {
		throw new Error("Error to fetch specialties");
	}

	findRanking(_: SpecialtyCode, __: number): Promise<SpecialtyRanking.Rank[]> {
		throw new Error("Error to fetch specialty ranking");
	}
}
