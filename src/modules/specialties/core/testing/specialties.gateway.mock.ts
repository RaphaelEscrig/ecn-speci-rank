/** ADAPTERS */
import type { SpecialtyCode } from "@/modules/shared/domain/models";
import type { InMemorySpecialtiesGateway } from "@/modules/specialties/core/infrastructure/in-memory/in-memory-specialties.gateway";
/** MODELS */
import type {
	Specialty,
	SpecialtyBlankRound,
	SpecialtyRanking,
	SpecialtySimulation,
} from "@/modules/specialties/core/domain/models";
/** PORTS */
import type { ISpecialtiesGateway } from "@/modules/specialties/core/domain/ports/specialties.port";

export class MockSpecialtiesGateway implements ISpecialtiesGateway {
	constructor(private readonly gateway: InMemorySpecialtiesGateway) {}

	public async findAllPerYear(year: number): Promise<Specialty.PerYear[]> {
		return await this.gateway.findAllPerYear(year);
	}

	public async findAllPerSimulation(
		stage: number
	): Promise<SpecialtySimulation.PerSpecialty[]> {
		return await this.gateway.findAllPerSimulation(stage);
	}

	public async findAllPerBlankRound(
		round: number
	): Promise<SpecialtyBlankRound.PerSpecialty[]> {
		return await this.gateway.findAllPerBlankRound(round);
	}

	public async findRanking(
		specialty: SpecialtyCode,
		year: number
	): Promise<SpecialtyRanking.Rank[]> {
		return this.gateway.findRanking(specialty, year);
	}
}
