/** FACTORIES */
import { SpecialtyFactory } from "@/modules/specialties/core/domain/factories/specialty.factory";
/** MODELS */
import type { Specialty } from "@/modules/specialties/core/domain/models";
/** PORTS */
import type { ISpecialtiesGateway } from "@/modules/specialties/core/domain/ports/specialties.port";

export class InMemorySpecialtiesGateway implements ISpecialtiesGateway {
	public async findAllPerYear(_: number): Promise<Specialty.PerYear[]> {
		return SpecialtyFactory.createSpecialtiesPerYear();
	}
}
