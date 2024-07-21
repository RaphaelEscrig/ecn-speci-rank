/** MODELS */
import type { Specialty } from "@/modules/specialties/core/domain/models";
/** PORTS */
import type { ISpecialtiesGateway } from "@/modules/specialties/core/domain/ports/specialties.port";

export class HttpSpecialtiesGateway implements ISpecialtiesGateway {
	public async findAllPerYear(year: number): Promise<Specialty.PerYear[]> {
		return [];
	}
}
