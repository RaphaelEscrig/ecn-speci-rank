/** FACTORIES */
import { SpecialtyFactory } from "@/modules/specialties/core/domain/factories/specialty.factory";
/** MODELS */
import type { SpecialtyCode } from "@/modules/shared/domain/models";
import type {
	Specialty,
	SpecialtyRanking,
	SpecialtySimulation,
} from "@/modules/specialties/core/domain/models";
/** PORTS */
import type { ISpecialtiesGateway } from "@/modules/specialties/core/domain/ports/specialties.port";

export class InMemorySpecialtiesGateway implements ISpecialtiesGateway {
	public async findAllPerYear(_: number): Promise<Specialty.PerYear[]> {
		return SpecialtyFactory.createSpecialtiesPerYear();
	}

	public async findAllPerSimulation(
		_: number
	): Promise<SpecialtySimulation.PerSpecialty[]> {
		return SpecialtyFactory.createSpecialtiesPerSimulation();
	}

	public async findAllPerBlankRound(
		_: number
	): Promise<SpecialtySimulation.PerSpecialty[]> {
		return SpecialtyFactory.createSpecialtiesBlankRound();
	}

	public async findRanking(
		specialty: SpecialtyCode,
		year: number
	): Promise<SpecialtyRanking.Rank[]> {
		return SpecialtyFactory.createSpecialtyRankingPerYear(specialty, year);
	}
}
