/** ADAPTERS */
import type { InMemorySpecialtiesGateway } from "../infrastructure/in-memory/in-memory-specialties.gateway";
/** MODELS */
import type { Specialty } from "@/modules/specialties/core/domain/models";
/** PORTS */
import type { ISpecialtiesGateway } from "@/modules/specialties/core/domain/ports/specialties.port";

export class MockSpecialtiesGateway implements ISpecialtiesGateway {
	constructor(private readonly gateway: InMemorySpecialtiesGateway) {}

	public async findAllPerYear(year: number): Promise<Specialty.PerYear[]> {
		return await this.gateway.findAllPerYear(year);
	}
}
