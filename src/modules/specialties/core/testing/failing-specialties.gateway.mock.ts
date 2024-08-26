/** MODELS */
import type { SpecialtyCode } from "@/modules/shared/domain/models";
import type {
	Specialty,
	SpecialtyBlankRound,
	SpecialtyRanking,
	SpecialtySimulation,
} from "@/modules/specialties/core/domain/models";
/** PORTS */
import type { ISpecialtiesGateway } from "@/modules/specialties/core/domain/ports/specialties.port";

export class MockFailingSpecialtiesGateway implements ISpecialtiesGateway {
	public async findAllPerYear(_: number): Promise<Specialty.PerYear[]> {
		throw new Error("Error to fetch specialties");
	}

	public async findAllPerSimulation(
		_: number
	): Promise<SpecialtySimulation.PerSpecialty[]> {
		throw new Error("Error to fetch simulation result");
	}

	public async findAllPerBlankRound(
		_: number
	): Promise<SpecialtyBlankRound.PerSpecialty[]> {
		throw new Error("Error to fetch blank round result");
	}

	public async findRanking(
		_: SpecialtyCode,
		__: number
	): Promise<SpecialtyRanking.Rank[]> {
		throw new Error("Error to fetch specialty ranking");
	}
}
